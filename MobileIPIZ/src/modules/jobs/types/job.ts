export type JobContract = 'Tempo Integral' | 'Meio Periodo' | 'Estagio' | 'Freelance';

export type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  contract: JobContract;
  salary: string;
  postedAt: string;
  summary: string;
};
