import { NextFunction, Request, Response } from 'express';
import { CreateSubjectDTO, UpdateSubjectDTO } from '../models/Subject';
import { subjectService } from '../services/SubjectService';

export class SubjectController {
  async createSubject(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const dto = req.body as CreateSubjectDTO;
      const subject = await subjectService.createSubject(dto);

      res.status(201).json({
        success: true,
        data: subject,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllSubjects(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const subjects = await subjectService.getAllSubjects();

      res.json({
        success: true,
        data: subjects,
      });
    } catch (error) {
      next(error);
    }
  }

  async getSubject(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const subject = await subjectService.getSubjectById(req.params.id);
      if (!subject) {
        res.status(404).json({ success: false, error: 'Subject not found' });
        return;
      }

      res.json({
        success: true,
        data: subject,
      });
    } catch (error) {
      next(error);
    }
  }

  async getSubjectsByClassGroup(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const subjects = await subjectService.getSubjectsByClassGroup(req.params.classGroupId);

      res.json({
        success: true,
        data: subjects,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateSubject(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const dto = req.body as UpdateSubjectDTO;
      const subject = await subjectService.updateSubject(req.params.id, dto);
      if (!subject) {
        res.status(404).json({ success: false, error: 'Subject not found' });
        return;
      }

      res.json({
        success: true,
        data: subject,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteSubject(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const deleted = await subjectService.deleteSubject(req.params.id);
      if (!deleted) {
        res.status(404).json({ success: false, error: 'Subject not found' });
        return;
      }

      res.json({
        success: true,
        message: 'Subject deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }
}
