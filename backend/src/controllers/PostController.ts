import { NextFunction, Response } from 'express';
import { AuthenticatedRequest } from '../auth/claims';
import { hasPermission, Permission } from '../auth/rbac';
import {
  CreatePostCommentDTO,
  CreatePostDTO,
  Post,
  PostStatus,
  TogglePostReactionDTO,
  UpdatePostDTO,
} from '../models/Post';
import { User, UserRole } from '../models/User';
import { userService } from '../services/UserService';
import { postService } from '../services/PostService';

type PostActor = {
  userId: string;
  authorName: string;
  role: UserRole;
};

export class PostController {
  private resolveClaims(req: AuthenticatedRequest, res: Response): NonNullable<AuthenticatedRequest['claims']> | null {
    if (!req.claims) {
      res.status(401).json({ success: false, error: 'Unauthorized' });
      return null;
    }

    return req.claims;
  }

  private async resolveUser(req: AuthenticatedRequest, res: Response): Promise<User | null> {
    const claims = this.resolveClaims(req, res);
    if (!claims) {
      return null;
    }

    const user = await userService.getUserById(claims.sub);
    if (!user) {
      res.status(401).json({ success: false, error: 'Invalid session identity' });
      return null;
    }

    return user;
  }

  private buildActor(user: User): PostActor {
    return {
      userId: user.id,
      authorName: `${user.firstName} ${user.lastName}`.trim() || user.email,
      role: user.role,
    };
  }

  private canModeratePosts(role: UserRole): boolean {
    return hasPermission(role, Permission.POST_MODERATE);
  }

  private canAccessPost(post: Post, claims: NonNullable<AuthenticatedRequest['claims']>): boolean {
    return this.canModeratePosts(claims.role) || post.status === PostStatus.APPROVED || post.authorUserId === claims.sub;
  }

  async createPost(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await this.resolveUser(req, res);
      if (!user) {
        return;
      }

      const dto = req.body as CreatePostDTO;
      const post = await postService.createPost(dto, this.buildActor(user));

      res.status(201).json({
        success: true,
        data: post,
      });
    } catch (error) {
      next(error);
    }
  }

  async getPosts(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const claims = this.resolveClaims(req, res);
      if (!claims) {
        return;
      }

      const posts = await postService.getVisiblePostsForUser(
        claims.sub,
        this.canModeratePosts(claims.role),
      );

      res.json({
        success: true,
        data: posts,
      });
    } catch (error) {
      next(error);
    }
  }

  async getPendingPosts(_req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const posts = await postService.getPendingPosts();
      res.json({
        success: true,
        data: posts,
      });
    } catch (error) {
      next(error);
    }
  }

  async updatePost(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const claims = this.resolveClaims(req, res);
      if (!claims) {
        return;
      }

      const existing = await postService.getPostById(req.params.id);
      if (!existing) {
        res.status(404).json({ success: false, error: 'Post not found' });
        return;
      }

      const canModeratePosts = this.canModeratePosts(claims.role);
      const isOwner = existing.authorUserId === claims.sub;
      if (!canModeratePosts && !isOwner) {
        res.status(403).json({ success: false, error: 'Cannot edit this post' });
        return;
      }

      const dto = req.body as UpdatePostDTO;
      const updated = await postService.updatePost(req.params.id, dto, {
        resetModeration: isOwner && !canModeratePosts,
      });

      res.json({
        success: true,
        data: updated,
      });
    } catch (error) {
      next(error);
    }
  }

  async addComment(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const claims = this.resolveClaims(req, res);
      if (!claims) {
        return;
      }

      const existing = await postService.getPostById(req.params.id);
      if (!existing) {
        res.status(404).json({ success: false, error: 'Post not found' });
        return;
      }

      if (!this.canAccessPost(existing, claims)) {
        res.status(403).json({ success: false, error: 'Cannot comment on this post' });
        return;
      }

      const user = await this.resolveUser(req, res);
      if (!user) {
        return;
      }

      const dto = req.body as CreatePostCommentDTO;
      const updated = await postService.addComment(req.params.id, dto, this.buildActor(user));

      res.status(201).json({
        success: true,
        data: updated,
      });
    } catch (error) {
      next(error);
    }
  }

  async toggleReaction(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const claims = this.resolveClaims(req, res);
      if (!claims) {
        return;
      }

      const existing = await postService.getPostById(req.params.id);
      if (!existing) {
        res.status(404).json({ success: false, error: 'Post not found' });
        return;
      }

      if (!this.canAccessPost(existing, claims)) {
        res.status(403).json({ success: false, error: 'Cannot react to this post' });
        return;
      }

      const dto = req.body as TogglePostReactionDTO;
      const updated = await postService.toggleReaction(req.params.id, dto, claims.sub);

      res.json({
        success: true,
        data: updated,
      });
    } catch (error) {
      next(error);
    }
  }

  async verifyPost(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const claims = this.resolveClaims(req, res);
      if (!claims) {
        return;
      }

      const approved = Boolean((req.body as { approved?: boolean }).approved);
      const updated = await postService.verifyPost(req.params.id, approved, claims.sub);
      if (!updated) {
        res.status(404).json({ success: false, error: 'Post not found' });
        return;
      }

      res.json({
        success: true,
        data: updated,
      });
    } catch (error) {
      next(error);
    }
  }

  async deletePost(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const claims = this.resolveClaims(req, res);
      if (!claims) {
        return;
      }

      const existing = await postService.getPostById(req.params.id);
      if (!existing) {
        res.status(404).json({ success: false, error: 'Post not found' });
        return;
      }

      const canModeratePosts = this.canModeratePosts(claims.role);
      const isOwner = existing.authorUserId === claims.sub;
      if (!canModeratePosts && !isOwner) {
        res.status(403).json({ success: false, error: 'Cannot delete this post' });
        return;
      }

      await postService.deletePost(req.params.id);
      res.json({
        success: true,
        message: 'Post deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }
}
