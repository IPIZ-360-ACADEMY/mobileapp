import { env } from '../../../core/config/env';
import { httpRequest } from '../../../core/api/httpClient';
import { Job, JobContract } from '../types/job';

type BackendJobType = 'full_time' | 'part_time' | 'internship' | 'contract';

type BackendJob = {
  id: string;
  companyName: string;
  title: string;
  description: string;
  type: BackendJobType;
  location: string;
  salaryRange: string;
  postedAt: string;
};

type JobsApiResponse = {
  success: boolean;
  data: BackendJob[];
  error?: string;
};

const mockJobs: Job[] = [
  {
    id: 'jb-1',
    title: 'Tecnico de Manutencao Industrial',
    company: 'IPIZ Labs',
    location: 'Luanda',
    contract: 'Tempo Integral',
    salary: '220.000 Kz - 300.000 Kz',
    postedAt: 'Hoje',
    summary: 'Atuar com manutencao preventiva de equipamentos e melhoria continua.',
  },
  {
    id: 'jb-2',
    title: 'Analista de Dados Jr',
    company: 'Nova Industria',
    location: 'Hibrido',
    contract: 'Tempo Integral',
    salary: '180.000 Kz - 240.000 Kz',
    postedAt: 'Ontem',
    summary: 'Suporte em dashboards operacionais e analise de performance academica.',
  },
  {
    id: 'jb-3',
    title: 'Designer de Produto Mobile',
    company: 'Studio Axis',
    location: 'Remoto',
    contract: 'Freelance',
    salary: 'Projeto',
    postedAt: '2 dias',
    summary: 'Evoluir fluxos de onboarding e experiencia de uso com foco em clareza.',
  },
];

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function mapContract(type: BackendJobType): JobContract {
  if (type === 'internship') {
    return 'Estagio';
  }

  if (type === 'contract') {
    return 'Freelance';
  }

  if (type === 'part_time') {
    return 'Meio Periodo';
  }

  return 'Tempo Integral';
}

function formatPostedAt(postedAt: string): string {
  const postedDate = new Date(postedAt);

  if (Number.isNaN(postedDate.getTime())) {
    return 'Recente';
  }

  const now = new Date();
  const diffMs = now.getTime() - postedDate.getTime();
  const dayMs = 24 * 60 * 60 * 1000;

  if (diffMs < dayMs) {
    return 'Hoje';
  }

  if (diffMs < dayMs * 2) {
    return 'Ontem';
  }

  const diffDays = Math.floor(diffMs / dayMs);
  return `${diffDays} dias`;
}

function mapBackendJob(job: BackendJob): Job {
  return {
    id: job.id,
    title: job.title,
    company: job.companyName,
    location: job.location,
    contract: mapContract(job.type),
    salary: job.salaryRange || 'A combinar',
    postedAt: formatPostedAt(job.postedAt),
    summary: job.description,
  };
}

export async function getJobs(): Promise<Job[]> {
  if (env.useMockApi) {
    await delay(600);
    return mockJobs;
  }

  const response = await httpRequest<JobsApiResponse>({
    method: 'GET',
    path: '/api/jobs/open',
    retry: 2,
    cacheTtlMs: 30_000,
  });

  if (!response.success || !Array.isArray(response.data)) {
    throw new Error(response.error || 'Resposta inesperada da API de vagas.');
  }

  return response.data.map(mapBackendJob);
}
