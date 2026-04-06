import { Router } from 'express';
import { ClassGroupController } from '../controllers/ClassGroupController';
import { Permission } from '../auth/rbac';
import { requirePermission, withAuthContext } from '../middlewares/authorize';

const router = Router();
const classGroupController = new ClassGroupController();

router.use(withAuthContext);

router.post('/', requirePermission(Permission.CLASS_CREATE), classGroupController.createClassGroup.bind(classGroupController));
router.get('/', requirePermission(Permission.CLASS_READ), classGroupController.getAllClassGroups.bind(classGroupController));
router.get('/:id', requirePermission(Permission.CLASS_READ), classGroupController.getClassGroup.bind(classGroupController));
router.put('/:id', requirePermission(Permission.CLASS_UPDATE), classGroupController.updateClassGroup.bind(classGroupController));
router.delete('/:id', requirePermission(Permission.CLASS_DELETE), classGroupController.deleteClassGroup.bind(classGroupController));

export default router;
