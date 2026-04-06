import { NextFunction, Request, Response } from 'express';
import { CreateClassGroupDTO, UpdateClassGroupDTO } from '../models/ClassGroup';
import { classGroupService } from '../services/ClassGroupService';

export class ClassGroupController {
  async createClassGroup(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const dto = req.body as CreateClassGroupDTO;
      const classGroup = await classGroupService.createClassGroup(dto);

      res.status(201).json({
        success: true,
        data: classGroup,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllClassGroups(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const classGroups = await classGroupService.getAllClassGroups();

      res.json({
        success: true,
        data: classGroups,
      });
    } catch (error) {
      next(error);
    }
  }

  async getClassGroup(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const classGroup = await classGroupService.getClassGroupById(req.params.id);
      if (!classGroup) {
        res.status(404).json({ success: false, error: 'Class group not found' });
        return;
      }

      res.json({
        success: true,
        data: classGroup,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateClassGroup(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const dto = req.body as UpdateClassGroupDTO;
      const classGroup = await classGroupService.updateClassGroup(req.params.id, dto);
      if (!classGroup) {
        res.status(404).json({ success: false, error: 'Class group not found' });
        return;
      }

      res.json({
        success: true,
        data: classGroup,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteClassGroup(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const deleted = await classGroupService.deleteClassGroup(req.params.id);
      if (!deleted) {
        res.status(404).json({ success: false, error: 'Class group not found' });
        return;
      }

      res.json({
        success: true,
        message: 'Class group deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }
}
