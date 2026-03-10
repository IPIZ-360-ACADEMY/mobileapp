import { Request, Response, NextFunction } from 'express';
import { JobService } from '../services/JobService';
import { CreateJobDTO, UpdateJobDTO, JobType } from '../models/Job';

const jobService = new JobService();

export class JobController {
  async createJob(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const dto: CreateJobDTO = req.body;
      const job = await jobService.createJob(dto);
      res.status(201).json({
        success: true,
        data: job,
      });
    } catch (error) {
      next(error);
    }
  }

  async getJob(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const job = await jobService.getJobById(id);

      if (!job) {
        res.status(404).json({
          success: false,
          error: 'Job not found',
        });
        return;
      }

      res.json({
        success: true,
        data: job,
      });
    } catch (error) {
      next(error);
    }
  }

  async getJobsByCompany(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { companyId } = req.params;
      const jobs = await jobService.getJobsByCompany(companyId);
      res.json({
        success: true,
        data: jobs,
      });
    } catch (error) {
      next(error);
    }
  }

  async getJobsByType(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { type } = req.params;
      const jobs = await jobService.getJobsByType(type as JobType);
      res.json({
        success: true,
        data: jobs,
      });
    } catch (error) {
      next(error);
    }
  }

  async getOpenJobs(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const jobs = await jobService.getOpenJobs();
      res.json({
        success: true,
        data: jobs,
      });
    } catch (error) {
      next(error);
    }
  }

  async searchJobs(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { q } = req.query;
      if (!q || typeof q !== 'string') {
        res.status(400).json({
          success: false,
          error: 'Query parameter "q" is required',
        });
        return;
      }

      const jobs = await jobService.searchJobs(q);
      res.json({
        success: true,
        data: jobs,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateJob(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const dto: UpdateJobDTO = req.body;
      const job = await jobService.updateJob(id, dto);

      if (!job) {
        res.status(404).json({
          success: false,
          error: 'Job not found',
        });
        return;
      }

      res.json({
        success: true,
        data: job,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteJob(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const deleted = await jobService.deleteJob(id);

      if (!deleted) {
        res.status(404).json({
          success: false,
          error: 'Job not found',
        });
        return;
      }

      res.json({
        success: true,
        message: 'Job deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllJobs(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const jobs = await jobService.getAllJobs();
      res.json({
        success: true,
        data: jobs,
      });
    } catch (error) {
      next(error);
    }
  }
}