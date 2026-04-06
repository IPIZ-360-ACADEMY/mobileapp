import { AppRole } from '../../../core/rbac/policy';
import { httpRequest } from '../../../core/api/httpClient';

type ApiEnvelope<TData> = {
  success: boolean;
  data: TData;
  error?: string;
};

type ApiMessage = {
  success: boolean;
  message?: string;
  error?: string;
};

function unwrap<TData>(response: ApiEnvelope<TData>, fallbackMessage: string): TData {
  if (!response.success) {
    throw new Error(response.error || fallbackMessage);
  }

  return response.data;
}

export type ManagedUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: AppRole;
  isActive: boolean;
  classGroupId?: string;
  department?: string;
  positionTitle?: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateManagedUserInput = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: AppRole;
  isActive?: boolean;
  classGroupId?: string;
  department?: string;
  positionTitle?: string;
};

export type UpdateManagedUserInput = {
  email?: string;
  firstName?: string;
  lastName?: string;
  isActive?: boolean;
  classGroupId?: string;
  department?: string;
  positionTitle?: string;
};

export type ManagedPostImage = {
  dataUrl: string;
  fileName: string;
  mimeType: string;
  sizeBytes: number;
};

export type ManagedPostComment = {
  id: string;
  authorUserId: string;
  authorName: string;
  authorRole: AppRole;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export type ManagedPostReaction = {
  userId: string;
  kind: 'like' | 'support' | 'celebrate';
  reactedAt: string;
};

export type ClassGroup = {
  id: string;
  name: string;
  code: string;
  academicYear: string;
  term: string;
  capacity: number;
  coordinatorTeacherId?: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateClassGroupInput = {
  name: string;
  code: string;
  academicYear: string;
  term: string;
  capacity: number;
  coordinatorTeacherId?: string;
};

export type UpdateClassGroupInput = Partial<CreateClassGroupInput>;

export type Subject = {
  id: string;
  name: string;
  code: string;
  workloadHours: number;
  classGroupId: string;
  teacherId?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CreateSubjectInput = {
  name: string;
  code: string;
  workloadHours: number;
  classGroupId: string;
  teacherId?: string;
  isActive?: boolean;
};

export type UpdateSubjectInput = Partial<CreateSubjectInput>;

export type ManagedPost = {
  id: string;
  authorUserId: string;
  authorName: string;
  authorRole: AppRole;
  content: string;
  image?: ManagedPostImage;
  comments: ManagedPostComment[];
  reactions: ManagedPostReaction[];
  status: 'pending' | 'approved' | 'rejected';
  verifiedByUserId?: string;
  verifiedAt?: string;
  createdAt: string;
  updatedAt: string;
};

export async function getManagedUsers(): Promise<ManagedUser[]> {
  const response = await httpRequest<ApiEnvelope<ManagedUser[]>>({
    method: 'GET',
    path: '/api/users',
    retry: 0,
  });

  return unwrap(response, 'Falha ao carregar usuarios.');
}

export async function createManagedUser(input: CreateManagedUserInput): Promise<ManagedUser> {
  const response = await httpRequest<ApiEnvelope<ManagedUser>, CreateManagedUserInput>({
    method: 'POST',
    path: '/api/users',
    body: input,
    retry: 0,
  });

  return unwrap(response, 'Falha ao criar usuario.');
}

export async function updateManagedUser(id: string, input: UpdateManagedUserInput): Promise<ManagedUser> {
  const response = await httpRequest<ApiEnvelope<ManagedUser>, UpdateManagedUserInput>({
    method: 'PUT',
    path: `/api/users/${id}`,
    body: input,
    retry: 0,
  });

  return unwrap(response, 'Falha ao atualizar usuario.');
}

export async function assignManagedUserRole(id: string, role: AppRole): Promise<ManagedUser> {
  const response = await httpRequest<ApiEnvelope<ManagedUser>, { role: AppRole }>({
    method: 'PUT',
    path: `/api/users/${id}/role`,
    body: { role },
    retry: 0,
  });

  return unwrap(response, 'Falha ao atualizar papel do usuario.');
}

export async function getClassGroups(): Promise<ClassGroup[]> {
  const response = await httpRequest<ApiEnvelope<ClassGroup[]>>({
    method: 'GET',
    path: '/api/classes',
    retry: 0,
  });

  return unwrap(response, 'Falha ao carregar turmas.');
}

export async function createClassGroup(input: CreateClassGroupInput): Promise<ClassGroup> {
  const response = await httpRequest<ApiEnvelope<ClassGroup>, CreateClassGroupInput>({
    method: 'POST',
    path: '/api/classes',
    body: input,
    retry: 0,
  });

  return unwrap(response, 'Falha ao criar turma.');
}

export async function updateClassGroup(id: string, input: UpdateClassGroupInput): Promise<ClassGroup> {
  const response = await httpRequest<ApiEnvelope<ClassGroup>, UpdateClassGroupInput>({
    method: 'PUT',
    path: `/api/classes/${id}`,
    body: input,
    retry: 0,
  });

  return unwrap(response, 'Falha ao atualizar turma.');
}

export async function deleteClassGroup(id: string): Promise<void> {
  const response = await httpRequest<ApiMessage>({
    method: 'DELETE',
    path: `/api/classes/${id}`,
    retry: 0,
  });

  if (!response.success) {
    throw new Error(response.error || 'Falha ao remover turma.');
  }
}

export async function getSubjects(): Promise<Subject[]> {
  const response = await httpRequest<ApiEnvelope<Subject[]>>({
    method: 'GET',
    path: '/api/subjects',
    retry: 0,
  });

  return unwrap(response, 'Falha ao carregar disciplinas.');
}

export async function createSubject(input: CreateSubjectInput): Promise<Subject> {
  const response = await httpRequest<ApiEnvelope<Subject>, CreateSubjectInput>({
    method: 'POST',
    path: '/api/subjects',
    body: input,
    retry: 0,
  });

  return unwrap(response, 'Falha ao criar disciplina.');
}

export async function updateSubject(id: string, input: UpdateSubjectInput): Promise<Subject> {
  const response = await httpRequest<ApiEnvelope<Subject>, UpdateSubjectInput>({
    method: 'PUT',
    path: `/api/subjects/${id}`,
    body: input,
    retry: 0,
  });

  return unwrap(response, 'Falha ao atualizar disciplina.');
}

export async function deleteSubject(id: string): Promise<void> {
  const response = await httpRequest<ApiMessage>({
    method: 'DELETE',
    path: `/api/subjects/${id}`,
    retry: 0,
  });

  if (!response.success) {
    throw new Error(response.error || 'Falha ao remover disciplina.');
  }
}

export async function getManagedPosts(): Promise<ManagedPost[]> {
  const response = await httpRequest<ApiEnvelope<ManagedPost[]>>({
    method: 'GET',
    path: '/api/posts',
    retry: 0,
  });

  return unwrap(response, 'Falha ao carregar posts.');
}

export async function getPendingPosts(): Promise<ManagedPost[]> {
  const response = await httpRequest<ApiEnvelope<ManagedPost[]>>({
    method: 'GET',
    path: '/api/posts/pending',
    retry: 0,
  });

  return unwrap(response, 'Falha ao carregar posts pendentes.');
}

export async function verifyPost(id: string, approved: boolean): Promise<ManagedPost> {
  const response = await httpRequest<ApiEnvelope<ManagedPost>, { approved: boolean }>({
    method: 'PATCH',
    path: `/api/posts/${id}/verify`,
    body: { approved },
    retry: 0,
  });

  return unwrap(response, 'Falha ao verificar post.');
}

export async function updatePost(id: string, content: string): Promise<ManagedPost> {
  const response = await httpRequest<ApiEnvelope<ManagedPost>, { content: string }>({
    method: 'PUT',
    path: `/api/posts/${id}`,
    body: { content },
    retry: 0,
  });

  return unwrap(response, 'Falha ao editar post.');
}

export async function deletePost(id: string): Promise<void> {
  const response = await httpRequest<ApiMessage>({
    method: 'DELETE',
    path: `/api/posts/${id}`,
    retry: 0,
  });

  if (!response.success) {
    throw new Error(response.error || 'Falha ao remover post.');
  }
}
