import { AppPermission, AppRole } from '../rbac/policy';

export type AuthProvider = 'local' | 'oidc';

export type SessionClaims = {
  sub: string;
  email: string;
  role: AppRole;
};

export type SessionToken = {
  accessToken: string;
  refreshToken: string;
  expiresInSeconds: number;
};

export type SessionIdentity = {
  userId: string;
  email: string;
  role: AppRole;
  permissions: AppPermission[];
};

export type LoginRequest = {
  email: string;
  password: string;
  provider?: AuthProvider;
};

export type LoginResponse = {
  success: boolean;
  session: SessionToken;
  identity: SessionIdentity;
};

export type RefreshTokenRequest = {
  refreshToken: string;
};

export type RefreshTokenResponse = {
  success: boolean;
  session: SessionToken;
};

export type MeResponse = {
  claims: SessionClaims;
  identity: SessionIdentity;
};

export type ApiEnvelope<TData> = {
  success: boolean;
  data: TData;
  error?: string;
};

export type SuperRootManageUserRequest = {
  userId?: string;
  email: string;
  firstName: string;
  lastName: string;
  role: AppRole;
  active: boolean;
};

export type SuperRootManageUserResponse = {
  success: boolean;
  userId: string;
  role: AppRole;
};
