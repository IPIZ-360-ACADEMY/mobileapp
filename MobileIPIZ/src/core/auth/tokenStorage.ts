import * as SecureStore from 'expo-secure-store';
import { SessionIdentity } from './blueprint';

const AUTH_SESSION_KEY = 'ipiz.auth.session.v1';

export type PersistedAuthSession = {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  identity: SessionIdentity;
};

let inMemorySession: PersistedAuthSession | null = null;

function isSessionShape(value: unknown): value is PersistedAuthSession {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const candidate = value as Partial<PersistedAuthSession>;
  return (
    typeof candidate.accessToken === 'string' &&
    typeof candidate.refreshToken === 'string' &&
    typeof candidate.expiresAt === 'number' &&
    !!candidate.identity &&
    typeof candidate.identity.email === 'string' &&
    typeof candidate.identity.role === 'string' &&
    typeof candidate.identity.userId === 'string' &&
    Array.isArray(candidate.identity.permissions)
  );
}

async function canUseSecureStore(): Promise<boolean> {
  try {
    return await SecureStore.isAvailableAsync();
  } catch {
    return false;
  }
}

export async function savePersistedAuthSession(session: PersistedAuthSession): Promise<void> {
  inMemorySession = session;

  if (!(await canUseSecureStore())) {
    return;
  }

  await SecureStore.setItemAsync(AUTH_SESSION_KEY, JSON.stringify(session));
}

export async function loadPersistedAuthSession(): Promise<PersistedAuthSession | null> {
  if (!(await canUseSecureStore())) {
    return inMemorySession;
  }

  const raw = await SecureStore.getItemAsync(AUTH_SESSION_KEY);
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!isSessionShape(parsed)) {
      await SecureStore.deleteItemAsync(AUTH_SESSION_KEY);
      inMemorySession = null;
      return null;
    }

    inMemorySession = parsed;
    return parsed;
  } catch {
    await SecureStore.deleteItemAsync(AUTH_SESSION_KEY);
    inMemorySession = null;
    return null;
  }
}

export async function clearPersistedAuthSession(): Promise<void> {
  inMemorySession = null;

  if (!(await canUseSecureStore())) {
    return;
  }

  await SecureStore.deleteItemAsync(AUTH_SESSION_KEY);
}