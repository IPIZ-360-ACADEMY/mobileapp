import { NextFunction, Response } from 'express';
import { AuthenticatedRequest } from '../auth/claims';
import { studentAcademicService } from '../services/StudentAcademicService';

export class StudentAcademicController {
  async getMyAcademicOverview(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const claims = req.claims;
      if (!claims) {
        res.status(401).json({ success: false, error: 'Unauthorized' });
        return;
      }

      const overview = await studentAcademicService.getOverviewForStudent(claims.sub);
      res.json({
        success: true,
        data: overview,
      });
    } catch (error) {
      next(error);
    }
  }
}