import { Router } from 'express';
import { Permission } from '../auth/rbac';
import { requireAnyRole, requirePermission, withAuthContext } from '../middlewares/authorize';
import { UserRole } from '../models/User';
import { PostController } from '../controllers/PostController';

const router = Router();
const postController = new PostController();

router.use(withAuthContext);

router.post('/', requirePermission(Permission.POST_CREATE), postController.createPost.bind(postController));
router.get('/', requirePermission(Permission.POST_READ), postController.getPosts.bind(postController));
router.get('/pending', requireAnyRole([UserRole.SUPER_ROOT, UserRole.ADMIN]), requirePermission(Permission.POST_MODERATE), postController.getPendingPosts.bind(postController));
router.put('/:id', requirePermission(Permission.POST_UPDATE), postController.updatePost.bind(postController));
router.post('/:id/comments', requirePermission(Permission.POST_COMMENT), postController.addComment.bind(postController));
router.post('/:id/reactions', requirePermission(Permission.POST_REACT), postController.toggleReaction.bind(postController));
router.patch('/:id/verify', requireAnyRole([UserRole.SUPER_ROOT, UserRole.ADMIN]), requirePermission(Permission.POST_MODERATE), postController.verifyPost.bind(postController));
router.delete('/:id', requirePermission(Permission.POST_DELETE), postController.deletePost.bind(postController));

export default router;
