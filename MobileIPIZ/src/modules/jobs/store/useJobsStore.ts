import { create } from 'zustand';
import { checkBackendHealth } from '../../../core/api';
import { env } from '../../../core/config/env';
import { getJobs } from '../services/jobsApi';
import { Job } from '../types/job';

type FetchStatus = 'idle' | 'loading' | 'success' | 'error';

type JobsState = {
  jobs: Job[];
  status: FetchStatus;
  errorMessage: string | null;
  fetchJobs: (force?: boolean) => Promise<void>;
};

export const useJobsStore = create<JobsState>((set, get) => ({
  jobs: [],
  status: 'idle',
  errorMessage: null,
  fetchJobs: async (force = false) => {
    const current = get();

    if (!force && current.status === 'loading') {
      return;
    }

    set({ status: 'loading', errorMessage: null });

    try {
      if (!env.useMockApi) {
        const health = await checkBackendHealth();

        if (!health.ok) {
          throw new Error(`Backend indisponivel (${health.message}). Verifique EXPO_PUBLIC_API_BASE_URL.`);
        }
      }

      const jobs = await getJobs();
      set({ jobs, status: 'success', errorMessage: null });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Falha inesperada ao carregar vagas.';
      set({ status: 'error', errorMessage: message });
    }
  },
}));
