import { env } from '../config/env';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

type RequestOptions<TBody> = {
  method?: HttpMethod;
  path: string;
  body?: TBody;
  headers?: Record<string, string>;
  retry?: number;
  cacheTtlMs?: number;
  signal?: AbortSignal;
  skipAuth?: boolean;
  skipAuthRefresh?: boolean;
};

type CacheEntry = {
  expiresAt: number;
  payload: unknown;
};

class HttpError extends Error {
  status: number;
  details?: unknown;

  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
    this.details = details;
  }
}

const responseCache = new Map<string, CacheEntry>();

type HttpAuthConfig = {
  getAccessToken?: () => string | null;
  refreshAccessToken?: () => Promise<boolean>;
};

let authConfig: HttpAuthConfig = {};

function buildUrl(path: string): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${env.apiBaseUrl}${normalizedPath}`;
}

function cacheKey(method: HttpMethod, path: string): string {
  return `${method}:${path}`;
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function httpRequest<TResponse, TBody = unknown>(
  options: RequestOptions<TBody>,
): Promise<TResponse> {
  const {
    method = 'GET',
    path,
    body,
    headers,
    retry = 1,
    cacheTtlMs = 0,
    signal,
    skipAuth = false,
    skipAuthRefresh = false,
  } = options;

  const key = cacheKey(method, path);
  const now = Date.now();

  if (method === 'GET' && cacheTtlMs > 0) {
    const cached = responseCache.get(key);
    if (cached && cached.expiresAt > now) {
      return cached.payload as TResponse;
    }
  }

  const url = buildUrl(path);
  const timeoutController = new AbortController();
  const timeout = setTimeout(() => timeoutController.abort(), env.requestTimeoutMs);

  try {
    let attempt = 0;
    let lastError: unknown;
    let refreshAttempted = false;

    while (attempt <= retry) {
      try {
        const accessToken = skipAuth ? null : authConfig.getAccessToken?.() || null;

        const response = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
            ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
            ...headers,
          },
          body: body === undefined ? undefined : JSON.stringify(body),
          signal: signal ?? timeoutController.signal,
        });

        const payload = (await response.json().catch(() => null)) as TResponse | null;

        if (
          response.status === 401 &&
          !skipAuth &&
          !skipAuthRefresh &&
          !refreshAttempted &&
          authConfig.refreshAccessToken
        ) {
          refreshAttempted = true;
          const refreshed = await authConfig.refreshAccessToken();
          if (refreshed) {
            continue;
          }
        }

        if (!response.ok) {
          throw new HttpError(
            `Request failed with status ${response.status}`,
            response.status,
            payload,
          );
        }

        if (method === 'GET' && cacheTtlMs > 0) {
          responseCache.set(key, {
            expiresAt: Date.now() + cacheTtlMs,
            payload,
          });
        }

        return payload as TResponse;
      } catch (error) {
        lastError = error;
        attempt += 1;
        if (attempt > retry) {
          break;
        }
        await wait(attempt * 250);
      }
    }

    throw lastError;
  } finally {
    clearTimeout(timeout);
  }
}

export function clearHttpCache(): void {
  responseCache.clear();
}

export function configureHttpAuth(nextConfig: HttpAuthConfig): void {
  authConfig = nextConfig;
}

export { HttpError };
