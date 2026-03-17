import {
  RefreshSessionRequest,
  RefreshSessionResponse,
  SessionIdentity,
  SsoLoginRequest,
  SsoLoginResponse,
  SessionToken,
} from '../auth/ssoBlueprint';
import { createSessionTokenPair, verifyRefreshToken } from '../auth/jwt';
import { listPermissionsForRole } from '../auth/rbac';
import { verifyPassword } from '../auth/password';
import { config } from '../config/environment';
import { userService } from './UserService';

type RefreshSessionRecord = {
  userId: string;
  expiresAt: number;
  revoked: boolean;
};

type AppError = Error & {
  statusCode?: number;
};

function createHttpError(statusCode: number, message: string): AppError {
  const error = new Error(message) as AppError;
  error.statusCode = statusCode;
  return error;
}

export class AuthService {
  private refreshSessions = new Map<string, RefreshSessionRecord>();

  private buildIdentity(userId: string, email: string, role: SessionIdentity['role']): SessionIdentity {
    return {
      userId,
      email,
      role,
      permissions: listPermissionsForRole(role),
    };
  }

  private createSession(user: { id: string; email: string; role: SessionIdentity['role'] }): SessionToken {
    const session = createSessionTokenPair({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    this.refreshSessions.set(session.tokenId, {
      userId: user.id,
      expiresAt: Date.now() + config.jwtRefreshTokenTtlSeconds * 1000,
      revoked: false,
    });

    return {
      accessToken: session.accessToken,
      refreshToken: session.refreshToken,
      expiresInSeconds: session.expiresInSeconds,
    };
  }

  async login(request: SsoLoginRequest): Promise<SsoLoginResponse> {
    const email = request.email?.trim().toLowerCase();
    const password = request.password || '';
    const provider = request.provider || 'local';

    if (!email || !password) {
      throw createHttpError(400, 'Email and password are required');
    }

    if (provider !== 'local' && provider !== 'oidc') {
      throw createHttpError(400, 'Unsupported auth provider');
    }

    const user = await userService.getUserByEmail(email);
    if (!user || !verifyPassword(password, user.password)) {
      throw createHttpError(401, 'Invalid credentials');
    }

    if (!user.isActive) {
      throw createHttpError(403, 'User account is inactive');
    }

    const session = this.createSession(user);
    const identity = this.buildIdentity(user.id, user.email, user.role);

    return {
      success: true,
      session,
      identity,
    };
  }

  async refreshSession(request: RefreshSessionRequest): Promise<RefreshSessionResponse> {
    if (!request.refreshToken) {
      throw createHttpError(400, 'Refresh token is required');
    }

    const payload = verifyRefreshToken(request.refreshToken);
    if (!payload) {
      throw createHttpError(401, 'Invalid refresh token');
    }

    const sessionRecord = this.refreshSessions.get(payload.tokenId);
    if (!sessionRecord || sessionRecord.revoked) {
      throw createHttpError(401, 'Refresh token is no longer valid');
    }

    if (sessionRecord.userId !== payload.sub || sessionRecord.expiresAt < Date.now()) {
      sessionRecord.revoked = true;
      this.refreshSessions.set(payload.tokenId, sessionRecord);
      throw createHttpError(401, 'Refresh token has expired');
    }

    sessionRecord.revoked = true;
    this.refreshSessions.set(payload.tokenId, sessionRecord);

    const user = await userService.getUserById(payload.sub);
    if (!user) {
      throw createHttpError(401, 'User session is invalid');
    }

    const session = this.createSession(user);

    return {
      success: true,
      session,
    };
  }

  async logout(refreshToken: string): Promise<void> {
    if (!refreshToken) {
      return;
    }

    const payload = verifyRefreshToken(refreshToken);
    if (!payload) {
      return;
    }

    const existing = this.refreshSessions.get(payload.tokenId);
    if (!existing) {
      return;
    }

    existing.revoked = true;
    this.refreshSessions.set(payload.tokenId, existing);
  }

  async getIdentityByUserId(userId: string): Promise<SessionIdentity | null> {
    const user = await userService.getUserById(userId);
    if (!user) {
      return null;
    }

    return this.buildIdentity(user.id, user.email, user.role);
  }
}

export const authService = new AuthService();