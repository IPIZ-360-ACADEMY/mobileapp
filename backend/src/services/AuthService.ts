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
import { dataStore, type RefreshSessionRecord } from '../storage/dataStore';
import { userService } from './UserService';

type AppError = Error & {
  statusCode?: number;
};

function createHttpError(statusCode: number, message: string): AppError {
  const error = new Error(message) as AppError;
  error.statusCode = statusCode;
  return error;
}

export class AuthService {
  private getRefreshSession(tokenId: string): RefreshSessionRecord | undefined {
    return dataStore
      .getSnapshot()
      .refreshSessions.find((session) => session.tokenId === tokenId);
  }

  private upsertRefreshSession(
    tokenId: string,
    userId: string,
    expiresAt: number,
    revoked: boolean,
  ): void {
    dataStore.update((state) => {
      const index = state.refreshSessions.findIndex((session) => session.tokenId === tokenId);
      const nextRecord: RefreshSessionRecord = {
        tokenId,
        userId,
        expiresAt,
        revoked,
        updatedAt: new Date(),
      };

      if (index >= 0) {
        state.refreshSessions[index] = nextRecord;
      } else {
        state.refreshSessions.push(nextRecord);
      }

      const now = Date.now();
      state.refreshSessions = state.refreshSessions.filter(
        (session) => !(session.revoked && session.expiresAt < now),
      );
    });
  }

  private revokeRefreshSession(tokenId: string): void {
    dataStore.update((state) => {
      const index = state.refreshSessions.findIndex((session) => session.tokenId === tokenId);
      if (index === -1) {
        return;
      }

      state.refreshSessions[index] = {
        ...state.refreshSessions[index],
        revoked: true,
        updatedAt: new Date(),
      };
    });
  }

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

    this.upsertRefreshSession(
      session.tokenId,
      user.id,
      Date.now() + config.jwtRefreshTokenTtlSeconds * 1000,
      false,
    );

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

    const sessionRecord = this.getRefreshSession(payload.tokenId);
    if (!sessionRecord || sessionRecord.revoked) {
      throw createHttpError(401, 'Refresh token is no longer valid');
    }

    if (sessionRecord.userId !== payload.sub || sessionRecord.expiresAt < Date.now()) {
      this.revokeRefreshSession(payload.tokenId);
      throw createHttpError(401, 'Refresh token has expired');
    }

    this.revokeRefreshSession(payload.tokenId);

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

    const existing = this.getRefreshSession(payload.tokenId);
    if (!existing) {
      return;
    }

    this.revokeRefreshSession(payload.tokenId);
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