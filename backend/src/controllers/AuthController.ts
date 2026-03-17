import { NextFunction, Request, Response } from 'express';
import { AuthenticatedRequest } from '../auth/claims';
import { authService } from '../services/AuthService';
import { SsoLoginRequest, RefreshSessionRequest } from '../auth/ssoBlueprint';

export class AuthController {
  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const payload = req.body as Partial<SsoLoginRequest>;

      if (!payload.email || !payload.password) {
        res.status(400).json({
          success: false,
          error: 'Email and password are required',
        });
        return;
      }

      const response = await authService.login({
        email: payload.email,
        password: payload.password,
        provider: payload.provider || 'local',
      });

      res.json({
        success: true,
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const payload = req.body as Partial<RefreshSessionRequest>;

      if (!payload.refreshToken) {
        res.status(400).json({
          success: false,
          error: 'Refresh token is required',
        });
        return;
      }

      const response = await authService.refreshSession({
        refreshToken: payload.refreshToken,
      });

      res.json({
        success: true,
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const payload = req.body as Partial<RefreshSessionRequest>;
      await authService.logout(payload.refreshToken || '');

      res.json({
        success: true,
        message: 'Session terminated',
      });
    } catch (error) {
      next(error);
    }
  }

  async me(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.claims) {
        res.status(401).json({
          success: false,
          error: 'Unauthorized',
        });
        return;
      }

      const identity = await authService.getIdentityByUserId(req.claims.sub);
      if (!identity) {
        res.status(401).json({
          success: false,
          error: 'Invalid session identity',
        });
        return;
      }

      res.json({
        success: true,
        data: {
          claims: req.claims,
          identity,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}