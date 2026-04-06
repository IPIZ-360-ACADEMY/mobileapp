import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { withAuthContext, requirePermission, requireAnyRole } from '../middlewares/authorize';
import { Permission } from '../auth/rbac';
import { UserRole } from '../models/User';

const router = Router();
const userController = new UserController();

router.use(withAuthContext);

// POST /api/users
router.post(
	'/',
	requirePermission(Permission.USER_CREATE),
	userController.createUser.bind(userController),
);

// GET /api/users
router.get(
	'/',
	requirePermission(Permission.USER_READ),
	userController.getAllUsers.bind(userController),
);

// GET /api/users/role/:role
router.get(
	'/role/:role',
	requirePermission(Permission.USER_READ),
	userController.getUsersByRole.bind(userController),
);

// PUT /api/users/:id/role
router.put(
	'/:id/role',
	requireAnyRole([UserRole.SUPER_ROOT]),
	requirePermission(Permission.USER_ASSIGN_ROLE),
	userController.assignUserRole.bind(userController),
);

// GET /api/users/:id
router.get(
	'/:id',
	requirePermission(Permission.USER_READ),
	userController.getUser.bind(userController),
);

// PUT /api/users/:id
router.put(
	'/:id',
	requireAnyRole([UserRole.SUPER_ROOT, UserRole.ADMIN]),
	requirePermission(Permission.USER_UPDATE),
	userController.updateUser.bind(userController),
);

// DELETE /api/users/:id
router.delete(
	'/:id',
	requireAnyRole([UserRole.SUPER_ROOT]),
	requirePermission(Permission.USER_DELETE),
	userController.deleteUser.bind(userController),
);

export default router;