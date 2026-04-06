import {
  CreatePostCommentDTO,
  CreatePostDTO,
  Post,
  PostComment,
  PostImage,
  PostReaction,
  PostReactionKind,
  PostStatus,
  TogglePostReactionDTO,
  UpdatePostDTO,
} from '../models/Post';
import { UserRole } from '../models/User';
import { dataStore } from '../storage/dataStore';

type AppError = Error & {
  statusCode?: number;
};

type PostAuthor = {
  userId: string;
  authorName: string;
  role: UserRole;
};

type UpdatePostOptions = {
  resetModeration?: boolean;
};

const MAX_POST_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;
const ALLOWED_IMAGE_MIME_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);

function createAppError(message: string, statusCode: number): AppError {
  const error = new Error(message) as AppError;
  error.statusCode = statusCode;
  return error;
}

function estimateDataUrlSizeBytes(dataUrl: string): number {
  const base64Payload = dataUrl.split(',')[1] || '';
  const padding = base64Payload.endsWith('==') ? 2 : base64Payload.endsWith('=') ? 1 : 0;
  return Math.max(0, Math.floor((base64Payload.length * 3) / 4) - padding);
}

function normalizePostContent(content?: string): string {
  return content?.trim() || '';
}

export class PostService {
  private normalizeImage(image?: PostImage | null): PostImage | undefined {
    if (!image) {
      return undefined;
    }

    const mimeType = image.mimeType?.trim().toLowerCase();
    const fileName = image.fileName?.trim();
    const dataUrl = image.dataUrl?.trim();
    const computedSizeBytes = estimateDataUrlSizeBytes(dataUrl);
    const sizeBytes = Math.max(image.sizeBytes || 0, computedSizeBytes);

    if (!mimeType || !ALLOWED_IMAGE_MIME_TYPES.has(mimeType)) {
      throw createAppError('A imagem do post deve ser JPG, PNG ou WEBP.', 400);
    }

    if (!fileName || !dataUrl?.startsWith(`data:${mimeType};base64,`)) {
      throw createAppError('Formato da imagem do post invalido.', 400);
    }

    if (sizeBytes > MAX_POST_IMAGE_SIZE_BYTES) {
      throw createAppError('A imagem do post deve ter no maximo 5MB.', 400);
    }

    return {
      dataUrl,
      fileName,
      mimeType,
      sizeBytes,
    };
  }

  private sortPosts(posts: Post[]): Post[] {
    return posts.sort((left, right) => right.createdAt.getTime() - left.createdAt.getTime());
  }

  private clonePost(post: Post): Post {
    return {
      ...post,
      image: post.image ? { ...post.image } : undefined,
      comments: post.comments.map((comment) => ({ ...comment })),
      reactions: post.reactions.map((reaction) => ({ ...reaction })),
    };
  }

  private ensurePostHasRenderableContent(content: string, image?: PostImage): void {
    if (!content && !image) {
      throw createAppError('O post precisa de texto ou imagem.', 400);
    }
  }

  private normalizeReactionKind(kind: PostReactionKind): PostReactionKind {
    if (!Object.values(PostReactionKind).includes(kind)) {
      throw createAppError('Tipo de reacao invalido.', 400);
    }

    return kind;
  }

  async createPost(dto: CreatePostDTO, author: PostAuthor): Promise<Post> {
    const normalizedContent = normalizePostContent(dto.content);
    const normalizedImage = this.normalizeImage(dto.image);
    this.ensurePostHasRenderableContent(normalizedContent, normalizedImage);

    let createdPost: Post | null = null;

    dataStore.update((state) => {
      createdPost = {
        id: state.counters.postNextId.toString(),
        authorUserId: author.userId,
        authorName: author.authorName,
        authorRole: author.role,
        content: normalizedContent,
        image: normalizedImage,
        comments: [],
        reactions: [],
        status: PostStatus.PENDING,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      state.posts.push(createdPost);
      state.counters.postNextId += 1;
    });

    if (!createdPost) {
      throw createAppError('Falha ao persistir post.', 500);
    }

    return this.clonePost(createdPost);
  }

  async getPostById(id: string): Promise<Post | null> {
    const post = dataStore.getSnapshot().posts.find((item) => item.id === id);
    return post ? this.clonePost(post) : null;
  }

  async getAllPosts(): Promise<Post[]> {
    return this.sortPosts(dataStore.getSnapshot().posts.map((post) => this.clonePost(post)));
  }

  async getApprovedPosts(): Promise<Post[]> {
    return this.sortPosts(
      dataStore.getSnapshot().posts
        .filter((post) => post.status === PostStatus.APPROVED)
        .map((post) => this.clonePost(post)),
    );
  }

  async getPendingPosts(): Promise<Post[]> {
    return this.sortPosts(
      dataStore.getSnapshot().posts
        .filter((post) => post.status === PostStatus.PENDING)
        .map((post) => this.clonePost(post)),
    );
  }

  async getVisiblePostsForUser(userId: string, canModeratePosts: boolean): Promise<Post[]> {
    return this.sortPosts(
      dataStore.getSnapshot().posts
        .filter(
          (post) =>
            canModeratePosts ||
            post.status === PostStatus.APPROVED ||
            post.authorUserId === userId,
        )
        .map((post) => this.clonePost(post)),
    );
  }

  async updatePost(id: string, dto: UpdatePostDTO, options?: UpdatePostOptions): Promise<Post | null> {
    const hasContentUpdate = Object.prototype.hasOwnProperty.call(dto, 'content');
    const hasImageUpdate = Object.prototype.hasOwnProperty.call(dto, 'image');
    let updatedPost: Post | null = null;

    dataStore.update((state) => {
      const index = state.posts.findIndex((post) => post.id === id);
      if (index === -1) {
        updatedPost = null;
        return;
      }

      const previousPost = state.posts[index];
      const nextContent = hasContentUpdate ? normalizePostContent(dto.content) : previousPost.content;
      const nextImage = hasImageUpdate ? this.normalizeImage(dto.image) : previousPost.image;

      this.ensurePostHasRenderableContent(nextContent, nextImage);

      state.posts[index] = {
        ...previousPost,
        content: nextContent,
        image: nextImage,
        ...(options?.resetModeration
          ? {
              status: PostStatus.PENDING,
              verifiedByUserId: undefined,
              verifiedAt: undefined,
            }
          : {}),
        updatedAt: new Date(),
      };

      updatedPost = this.clonePost(state.posts[index]);
    });

    return updatedPost;
  }

  async addComment(id: string, dto: CreatePostCommentDTO, author: PostAuthor): Promise<Post | null> {
    const content = dto.content?.trim();
    if (!content) {
      throw createAppError('O comentario nao pode estar vazio.', 400);
    }

    let updatedPost: Post | null = null;

    dataStore.update((state) => {
      const index = state.posts.findIndex((post) => post.id === id);
      if (index === -1) {
        updatedPost = null;
        return;
      }

      const comment: PostComment = {
        id: state.counters.postCommentNextId.toString(),
        authorUserId: author.userId,
        authorName: author.authorName,
        authorRole: author.role,
        content,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      state.posts[index] = {
        ...state.posts[index],
        comments: [...state.posts[index].comments, comment],
        updatedAt: new Date(),
      };

      state.counters.postCommentNextId += 1;
      updatedPost = this.clonePost(state.posts[index]);
    });

    return updatedPost;
  }

  async toggleReaction(id: string, dto: TogglePostReactionDTO, userId: string): Promise<Post | null> {
    const normalizedKind = this.normalizeReactionKind(dto.kind);
    let updatedPost: Post | null = null;

    dataStore.update((state) => {
      const index = state.posts.findIndex((post) => post.id === id);
      if (index === -1) {
        updatedPost = null;
        return;
      }

      const nextReactions: PostReaction[] = [...state.posts[index].reactions];
      const existingReactionIndex = nextReactions.findIndex((reaction) => reaction.userId === userId);

      if (existingReactionIndex >= 0 && nextReactions[existingReactionIndex].kind === normalizedKind) {
        nextReactions.splice(existingReactionIndex, 1);
      } else if (existingReactionIndex >= 0) {
        nextReactions[existingReactionIndex] = {
          ...nextReactions[existingReactionIndex],
          kind: normalizedKind,
          reactedAt: new Date(),
        };
      } else {
        nextReactions.push({
          userId,
          kind: normalizedKind,
          reactedAt: new Date(),
        });
      }

      state.posts[index] = {
        ...state.posts[index],
        reactions: nextReactions,
        updatedAt: new Date(),
      };

      updatedPost = this.clonePost(state.posts[index]);
    });

    return updatedPost;
  }

  async verifyPost(id: string, approved: boolean, verifiedByUserId: string): Promise<Post | null> {
    let updatedPost: Post | null = null;

    dataStore.update((state) => {
      const index = state.posts.findIndex((post) => post.id === id);
      if (index === -1) {
        updatedPost = null;
        return;
      }

      state.posts[index] = {
        ...state.posts[index],
        status: approved ? PostStatus.APPROVED : PostStatus.REJECTED,
        verifiedByUserId,
        verifiedAt: new Date(),
        updatedAt: new Date(),
      };

      updatedPost = this.clonePost(state.posts[index]);
    });

    return updatedPost;
  }

  async deletePost(id: string): Promise<boolean> {
    let deleted = false;

    dataStore.update((state) => {
      const index = state.posts.findIndex((post) => post.id === id);
      if (index === -1) {
        deleted = false;
        return;
      }

      state.posts.splice(index, 1);
      deleted = true;
    });

    return deleted;
  }
}

export const postService = new PostService();
