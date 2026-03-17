import { UserRole } from './User';

export enum PostStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export enum PostReactionKind {
  LIKE = 'like',
  SUPPORT = 'support',
  CELEBRATE = 'celebrate',
}

export interface PostImage {
  dataUrl: string;
  fileName: string;
  mimeType: string;
  sizeBytes: number;
}

export interface PostComment {
  id: string;
  authorUserId: string;
  authorName: string;
  authorRole: UserRole;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PostReaction {
  userId: string;
  kind: PostReactionKind;
  reactedAt: Date;
}

export interface Post {
  id: string;
  authorUserId: string;
  authorName: string;
  authorRole: UserRole;
  content: string;
  image?: PostImage;
  comments: PostComment[];
  reactions: PostReaction[];
  status: PostStatus;
  verifiedByUserId?: string;
  verifiedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreatePostDTO {
  content?: string;
  image?: PostImage;
}

export interface UpdatePostDTO {
  content?: string;
  image?: PostImage | null;
}

export interface CreatePostCommentDTO {
  content: string;
}

export interface TogglePostReactionDTO {
  kind: PostReactionKind;
}
