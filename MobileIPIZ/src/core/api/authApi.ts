import {
  ApiEnvelope,
  LoginRequest,
  LoginResponse,
  MeResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
} from '../auth/blueprint';
import { httpRequest } from './httpClient';

type LogoutResponse = {
  success: boolean;
  message?: string;
  error?: string;
};

function ensureSuccess<TData>(envelope: ApiEnvelope<TData>, fallbackMessage: string): TData {
  if (!envelope.success) {
    throw new Error(envelope.error || fallbackMessage);
  }

  return envelope.data;
}

export async function loginWithPassword(payload: LoginRequest): Promise<LoginResponse> {
  const response = await httpRequest<ApiEnvelope<LoginResponse>, LoginRequest>({
    method: 'POST',
    path: '/api/auth/login',
    body: {
      ...payload,
      provider: payload.provider || 'local',
    },
    retry: 0,
    skipAuth: true,
  });

  return ensureSuccess(response, 'Falha no login.');
}

export async function refreshAuthSession(payload: RefreshTokenRequest): Promise<RefreshTokenResponse> {
  const response = await httpRequest<ApiEnvelope<RefreshTokenResponse>, RefreshTokenRequest>({
    method: 'POST',
    path: '/api/auth/refresh',
    body: payload,
    retry: 0,
    skipAuth: true,
  });

  return ensureSuccess(response, 'Falha ao renovar sessao.');
}

export async function getCurrentSession(options?: { skipAuthRefresh?: boolean }): Promise<MeResponse> {
  const response = await httpRequest<ApiEnvelope<MeResponse>>({
    method: 'GET',
    path: '/api/auth/me',
    retry: 0,
    skipAuthRefresh: options?.skipAuthRefresh,
  });

  return ensureSuccess(response, 'Sessao invalida.');
}

export async function logoutSession(refreshToken: string): Promise<void> {
  const response = await httpRequest<LogoutResponse, RefreshTokenRequest>({
    method: 'POST',
    path: '/api/auth/logout',
    body: { refreshToken },
    retry: 0,
    skipAuth: true,
  });

  if (!response.success) {
    throw new Error(response.error || 'Falha ao encerrar sessao.');
  }
}