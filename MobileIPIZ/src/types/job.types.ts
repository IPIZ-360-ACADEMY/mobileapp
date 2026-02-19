export enum JobType {
  FULL_TIME = 'FULL_TIME',
  PART_TIME = 'PART_TIME',
  INTERNSHIP = 'INTERNSHIP',
  CONTRACT = 'CONTRACT',
}

export enum JobStatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
  FILLED = 'FILLED',
}

export interface Job {
  id: string;
  companyId: string;
  companyName: string;
  title: string;
  description: string;
  requirements: string[];
  skills: string[];
  type: JobType;
  status: JobStatus;
  location: string;
  salaryRange?: string;
  postedAt: string;
  deadline?: string;
}

export interface JobApplication {
  id: string;
  jobId: string;
  studentId: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  appliedAt: string;
  coverLetter?: string;
}
