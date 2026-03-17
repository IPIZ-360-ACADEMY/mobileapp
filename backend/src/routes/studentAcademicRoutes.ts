import { Router } from 'express';
import { Permission } from '../auth/rbac';
import { requireAnyRole, requirePermission, withAuthContext } from '../middlewares/authorize';
import { UserRole } from '../models/User';
import { StudentAcademicController } from '../controllers/StudentAcademicController';

const router = Router();
const studentAcademicController = new StudentAcademicController();

router.use(withAuthContext);

router.get(
  '/me/overview',
  requireAnyRole([UserRole.STUDENT]),
  requirePermission(Permission.ACADEMIC_READ_SELF),
  studentAcademicController.getMyAcademicOverview.bind(studentAcademicController),
);

export default router;