import { env } from '../config/env';
import { httpRequest } from './httpClient';

type HealthResponse = {
  status?: string;
  timestamp?: string;
  service?: string;
};

export type BackendHealthResult = {
  ok: boolean;
  mode: 'backend' | 'mock';
  message: string;
};

export async function checkBackendHealth(): Promise<BackendHealthResult> {
  if (env.useMockApi) {
    return {
      ok: true,
      mode: 'mock',
      message: 'modo mock ativo',
    };
  }

  try {
    const health = await httpRequest<HealthResponse>({
      method: 'GET',
      path: '/health',
      retry: 1,
      cacheTtlMs: 15_000,
    });

    if (health.status === 'OK') {
      return {
        ok: true,
        mode: 'backend',
        message: 'backend online',
      };
    }

    return {
      ok: false,
      mode: 'backend',
      message: 'resposta de health invalida',
    };
  } catch {
    return {
      ok: false,
      mode: 'backend',
      message: 'falha de conexao com o backend',
    };
  }
}
