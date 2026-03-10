import { Router } from 'express';
import { UserController } from '../controllers/UserController';

const router = Router();
const userController = new UserController();

// POST /api/users
router.post('/', userController.createUser.bind(userController));

// GET /api/users
router.get('/', userController.getAllUsers.bind(userController));

// GET /api/users/role/:role
router.get('/role/:role', userController.getUsersByRole.bind(userController));

// GET /api/users/:id
router.get('/:id', userController.getUser.bind(userController));

// PUT /api/users/:id
router.put('/:id', userController.updateUser.bind(userController));

// DELETE /api/users/:id
router.delete('/:id', userController.deleteUser.bind(userController));

export default router;