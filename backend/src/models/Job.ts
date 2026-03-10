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
  salaryRange: string;
  postedAt: Date;
  deadline: Date;
  createdAt: Date;
  updatedAt: Date;
}

export enum JobType {
  FULL_TIME = 'full_time',
  PART_TIME = 'part_time',
  INTERNSHIP = 'internship',
  CONTRACT = 'contract',
}

export enum JobStatus {
  DRAFT = 'draft',
  OPEN = 'open',
  CLOSED = 'closed',
  FILLED = 'filled',
}

export interface CreateJobDTO {
  companyId: string;
  title: string;
  description: string;
  requirements: string[];
  skills: string[];
  type: JobType;
  location: string;
  salaryRange: string;
  deadline: Date;
}

export interface UpdateJobDTO {
  title?: string;
  description?: string;
  requirements?: string[];
  skills?: string[];
  type?: JobType;
  status?: JobStatus;
  location?: string;
  salaryRange?: string;
  deadline?: Date;
}