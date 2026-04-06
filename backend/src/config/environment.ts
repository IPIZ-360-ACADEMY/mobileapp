export interface Config {
  port: number;
  corsOrigin: string;
  nodeEnv: string;
  jwtSecret: string;
  jwtAccessTokenTtlSeconds: number;
  jwtRefreshTokenTtlSeconds: number;
  allowLegacyClaimsHeaders: boolean;
  superRootEmail: string;
  superRootPassword: string;
  databaseUrl: string;
  rbacEnforced: boolean;
  dataStorePath: string;
}

export const config: Config = {
  port: parseInt(process.env.PORT || '3000', 10),
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:8081',
  nodeEnv: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
  jwtAccessTokenTtlSeconds: parseInt(process.env.JWT_ACCESS_TTL_SECONDS || '900', 10),
  jwtRefreshTokenTtlSeconds: parseInt(process.env.JWT_REFRESH_TTL_SECONDS || '604800', 10),
  allowLegacyClaimsHeaders: process.env.ALLOW_LEGACY_CLAIMS_HEADERS === 'true',
  superRootEmail: (process.env.SUPER_ROOT_EMAIL || '').trim().toLowerCase(),
  superRootPassword: process.env.SUPER_ROOT_PASSWORD || '',
  databaseUrl: process.env.DATABASE_URL || 'postgresql://localhost:5432/ipiz_db',
  rbacEnforced: process.env.RBAC_ENFORCED === 'true',
  dataStorePath: (process.env.DATA_STORE_PATH || '.data/app-store.json').trim(),
};