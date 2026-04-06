import { UserRole } from '../models/User';
import { Permission } from './rbac';

export type AuthProvider = 'local' | 'oidc';

export type SsoLoginRequest = {
  email: string;
  password: string;
  provider: AuthProvider;
};

export type SessionToken = {
  accessToken: string;
  refreshToken: string;
  expiresInSeconds: number;
};

export type SessionIdentity = {
  userId: string;
  email: string;
  role: UserRole;
  permissions: Permission[];
};

export type SsoLoginResponse = {
  success: boolean;
  session: SessionToken;
  identity: SessionIdentity;
};

export type RefreshSessionRequest = {
  refreshToken: string;
};

export type RefreshSessionResponse = {
  success: boolean;
  session: SessionToken;
};

export type SuperRootUserUpsertRequest = {
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  isActive: boolean;
};

export type SuperRootUserUpsertResponse = {
  success: boolean;
  userId: string;
  role: UserRole;
};

export type RoleChangeAuditRecord = {
  actorUserId: string;
  actorRole: UserRole;
  targetUserId: string;
  previousRole: UserRole;
  nextRole: UserRole;
  changedAtIso: string;
};
