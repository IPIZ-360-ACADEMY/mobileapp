import { useCallback, useEffect, useMemo, useState } from 'react';
import { checkBackendHealth } from '../api';

type BackendUiStatus = 'checking' | 'online' | 'offline' | 'mock';
type BackendUiTone = 'muted' | 'success' | 'error' | 'primary';

type BackendHealthState = {
  status: BackendUiStatus;
  label: string;
  tone: BackendUiTone;
  isChecking: boolean;
  refresh: () => Promise<void>;
};

export function useBackendHealth(): BackendHealthState {
  const [status, setStatus] = useState<BackendUiStatus>('checking');

  const refresh = useCallback(async () => {
    setStatus('checking');

    const result = await checkBackendHealth();
    if (result.mode === 'mock') {
      setStatus('mock');
      return;
    }

    setStatus(result.ok ? 'online' : 'offline');
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const descriptor = useMemo(() => {
    if (status === 'checking') {
      return { label: 'A validar conexao', tone: 'muted' as const };
    }

    if (status === 'online') {
      return { label: 'Backend online', tone: 'success' as const };
    }

    if (status === 'mock') {
      return { label: 'Modo mock ativo', tone: 'primary' as const };
    }

    return { label: 'Backend offline', tone: 'error' as const };
  }, [status]);

  return {
    status,
    label: descriptor.label,
    tone: descriptor.tone,
    isChecking: status === 'checking',
    refresh,
  };
}
