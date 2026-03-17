import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { requireAuthenticated, withAuthContext } from '../middlewares/authorize';

const router = Router();
const authController = new AuthController();

router.post('/login', authController.login.bind(authController));
router.post('/refresh', authController.refresh.bind(authController));
router.post('/logout', authController.logout.bind(authController));
router.get('/me', withAuthContext, requireAuthenticated, authController.me.bind(authController));

export default router;