import { httpRequest } from '../../../core/api/httpClient';
import { AppRole } from '../../../core/rbac/policy';

type ApiEnvelope<TData> = {
  success: boolean;
  data: TData;
  error?: string;
};

function unwrap<TData>(response: ApiEnvelope<TData>, fallbackMessage: string): TData {
  if (!response.success) {
    throw new Error(response.error || fallbackMessage);
  }

  return response.data;
}

export type FeedReactionKind = 'like' | 'support' | 'celebrate';

export type FeedPostImage = {
  dataUrl: string;
  fileName: string;
  mimeType: string;
  sizeBytes: number;
};

export type FeedComment = {
  id: string;
  authorUserId: string;
  authorName: string;
  authorRole: AppRole;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export type FeedReaction = {
  userId: string;
  kind: FeedReactionKind;
  reactedAt: string;
};

export type FeedPost = {
  id: string;
  authorUserId: string;
  authorName: string;
  authorRole: AppRole;
  content: string;
  image?: FeedPostImage;
  comments: FeedComment[];
  reactions: FeedReaction[];
  status: 'pending' | 'approved' | 'rejected';
  verifiedByUserId?: string;
  verifiedAt?: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateFeedPostInput = {
  content?: string;
  image?: FeedPostImage;
};

export async function getFeedPosts(): Promise<FeedPost[]> {
  const response = await httpRequest<ApiEnvelope<FeedPost[]>>({
    method: 'GET',
    path: '/api/posts',
    retry: 0,
  });

  return unwrap(response, 'Falha ao carregar o feed.');
}

export async function createFeedPost(input: CreateFeedPostInput): Promise<FeedPost> {
  const response = await httpRequest<ApiEnvelope<FeedPost>, CreateFeedPostInput>({
    method: 'POST',
    path: '/api/posts',
    body: input,
    retry: 0,
  });

  return unwrap(response, 'Falha ao publicar o post.');
}

export async function addFeedComment(postId: string, content: string): Promise<FeedPost> {
  const response = await httpRequest<ApiEnvelope<FeedPost>, { content: string }>({
    method: 'POST',
    path: `/api/posts/${postId}/comments`,
    body: { content },
    retry: 0,
  });

  return unwrap(response, 'Falha ao comentar o post.');
}

export async function toggleFeedReaction(postId: string, kind: FeedReactionKind): Promise<FeedPost> {
  const response = await httpRequest<ApiEnvelope<FeedPost>, { kind: FeedReactionKind }>({
    method: 'POST',
    path: `/api/posts/${postId}/reactions`,
    body: { kind },
    retry: 0,
  });

  return unwrap(response, 'Falha ao reagir ao post.');
}