import { Router } from 'express';
import { SubjectController } from '../controllers/SubjectController';
import { Permission } from '../auth/rbac';
import { requirePermission, withAuthContext } from '../middlewares/authorize';

const router = Router();
const subjectController = new SubjectController();

router.use(withAuthContext);

router.post('/', requirePermission(Permission.SUBJECT_CREATE), subjectController.createSubject.bind(subjectController));
router.get('/', requirePermission(Permission.SUBJECT_READ), subjectController.getAllSubjects.bind(subjectController));
router.get('/class/:classGroupId', requirePermission(Permission.SUBJECT_READ), subjectController.getSubjectsByClassGroup.bind(subjectController));
router.get('/:id', requirePermission(Permission.SUBJECT_READ), subjectController.getSubject.bind(subjectController));
router.put('/:id', requirePermission(Permission.SUBJECT_UPDATE), subjectController.updateSubject.bind(subjectController));
router.delete('/:id', requirePermission(Permission.SUBJECT_DELETE), subjectController.deleteSubject.bind(subjectController));

export default router;
