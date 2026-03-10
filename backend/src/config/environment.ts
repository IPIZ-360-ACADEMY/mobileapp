export interface Config {
  port: number;
  corsOrigin: string;
  nodeEnv: string;
  jwtSecret: string;
  databaseUrl: string;
}

export const config: Config = {
  port: parseInt(process.env.PORT || '3000', 10),
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:8081',
  nodeEnv: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
  databaseUrl: process.env.DATABASE_URL || 'postgresql://localhost:5432/ipiz_db',
};