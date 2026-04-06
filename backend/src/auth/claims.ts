import { Request } from 'express';
import { verifyAccessToken } from './jwt';
import { config } from '../config/environment';
import { UserRole } from '../models/User';

export type SessionClaims = {
  sub: string;
  email: string;
  role: UserRole;
};

export type AuthenticatedRequest = Request & {
  claims?: SessionClaims;
};

function parseRole(rawRole: string | undefined): UserRole {
  const value = (rawRole || '').toLowerCase();

  if (value === UserRole.SUPER_ROOT) return UserRole.SUPER_ROOT;
  if (value === UserRole.ADMIN) return UserRole.ADMIN;
  if (value === UserRole.COMPANY) return UserRole.COMPANY;
  if (value === UserRole.TEACHER) return UserRole.TEACHER;
  if (value === UserRole.ALUMNI) return UserRole.ALUMNI;

  return UserRole.STUDENT;
}

function readBearerToken(req: Request): string | null {
  const authorization = req.header('authorization');
  if (!authorization) {
    return null;
  }

  const [scheme, token] = authorization.split(' ');
  if (!scheme || !token || scheme.toLowerCase() !== 'bearer') {
    return null;
  }

  return token.trim();
}

export function claimsFromHeaders(req: Request): SessionClaims | null {
  const userId = req.header('x-user-id')?.trim();
  const email = req.header('x-user-email')?.trim();

  if (!userId || !email) {
    return null;
  }

  const role = parseRole(req.header('x-user-role'));

  return {
    sub: userId,
    email,
    role,
  };
}

export function claimsFromRequest(req: Request): SessionClaims | null {
  const token = readBearerToken(req);
  if (token) {
    const payload = verifyAccessToken(token);
    if (payload) {
      return {
        sub: payload.sub,
        email: payload.email,
        role: parseRole(payload.role),
      };
    }
  }

  if (!config.allowLegacyClaimsHeaders) {
    return null;
  }

  return claimsFromHeaders(req);
}
