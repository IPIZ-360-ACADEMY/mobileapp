import { Job, CreateJobDTO, UpdateJobDTO, JobType, JobStatus } from '../models/Job';

export class JobService {
  // In-memory storage for skeleton - replace with database later
  private jobs: Job[] = [];
  private nextId = 1;

  async createJob(dto: CreateJobDTO): Promise<Job> {
    const job: Job = {
      id: this.nextId.toString(),
      ...dto,
      status: JobStatus.OPEN,
      postedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.jobs.push(job);
    this.nextId++;

    return job;
  }

  async getJobById(id: string): Promise<Job | null> {
    return this.jobs.find(job => job.id === id) || null;
  }

  async getJobsByCompany(companyId: string): Promise<Job[]> {
    return this.jobs.filter(job => job.companyId === companyId);
  }

  async getJobsByType(type: JobType): Promise<Job[]> {
    return this.jobs.filter(job => job.type === type);
  }

  async getOpenJobs(): Promise<Job[]> {
    return this.jobs.filter(job => job.status === JobStatus.OPEN);
  }

  async searchJobs(query: string): Promise<Job[]> {
    const lowerQuery = query.toLowerCase();
    return this.jobs.filter(job =>
      job.title.toLowerCase().includes(lowerQuery) ||
      job.companyName.toLowerCase().includes(lowerQuery) ||
      job.description.toLowerCase().includes(lowerQuery) ||
      job.skills.some(skill => skill.toLowerCase().includes(lowerQuery))
    );
  }

  async updateJob(id: string, dto: UpdateJobDTO): Promise<Job | null> {
    const index = this.jobs.findIndex(job => job.id === id);
    if (index === -1) return null;

    this.jobs[index] = {
      ...this.jobs[index],
      ...dto,
      updatedAt: new Date(),
    };

    return this.jobs[index];
  }

  async deleteJob(id: string): Promise<boolean> {
    const index = this.jobs.findIndex(job => job.id === id);
    if (index === -1) return false;

    this.jobs.splice(index, 1);
    return true;
  }

  async getAllJobs(): Promise<Job[]> {
    return [...this.jobs];
  }
}