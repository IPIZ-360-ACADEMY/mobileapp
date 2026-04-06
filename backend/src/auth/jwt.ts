import jwt from 'jsonwebtoken';
import { randomUUID } from 'crypto';
import { config } from '../config/environment';
import { UserRole } from '../models/User';

const ALGORITHM: jwt.Algorithm = 'HS256';

export type AccessTokenPayload = {
  sub: string;
  email: string;
  role: UserRole;
  tokenType: 'access';
  iat?: number;
  exp?: number;
};

export type RefreshTokenPayload = {
  sub: string;
  tokenId: string;
  tokenType: 'refresh';
  iat?: number;
  exp?: number;
};

type SessionTokenPair = {
  accessToken: string;
  refreshToken: string;
  tokenId: string;
  expiresInSeconds: number;
};

export function createSessionTokenPair(claims: {
  sub: string;
  email: string;
  role: UserRole;
}): SessionTokenPair {
  const tokenId = randomUUID();

  const accessToken = jwt.sign(
    {
      sub: claims.sub,
      email: claims.email,
      role: claims.role,
      tokenType: 'access',
    },
    config.jwtSecret,
    {
      algorithm: ALGORITHM,
      expiresIn: config.jwtAccessTokenTtlSeconds,
    },
  );

  const refreshToken = jwt.sign(
    {
      sub: claims.sub,
      tokenId,
      tokenType: 'refresh',
    },
    config.jwtSecret,
    {
      algorithm: ALGORITHM,
      expiresIn: config.jwtRefreshTokenTtlSeconds,
    },
  );

  return {
    accessToken,
    refreshToken,
    tokenId,
    expiresInSeconds: config.jwtAccessTokenTtlSeconds,
  };
}

export function verifyAccessToken(token: string): AccessTokenPayload | null {
  try {
    const payload = jwt.verify(token, config.jwtSecret) as AccessTokenPayload;
    if (payload.tokenType !== 'access') {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export function verifyRefreshToken(token: string): RefreshTokenPayload | null {
  try {
    const payload = jwt.verify(token, config.jwtSecret) as RefreshTokenPayload;
    if (payload.tokenType !== 'refresh') {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}