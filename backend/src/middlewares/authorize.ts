import { NextFunction, Response } from 'express';
import { claimsFromRequest, AuthenticatedRequest } from '../auth/claims';
import { Permission, hasAnyRole, hasPermission } from '../auth/rbac';
import { UserRole } from '../models/User';
import { config } from '../config/environment';

export function withAuthContext(req: AuthenticatedRequest, _res: Response, next: NextFunction): void {
  req.claims = claimsFromRequest(req) || undefined;
  next();
}

export function requireAuthenticated(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  const claims = req.claims || claimsFromRequest(req);
  if (!claims) {
    res.status(401).json({
      success: false,
      error: 'Unauthorized',
    });
    return;
  }

  req.claims = claims;
  next();
}

export function requirePermission(permission: Permission) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!config.rbacEnforced) {
      next();
      return;
    }

    const claims = req.claims || claimsFromRequest(req);
    if (!claims) {
      res.status(401).json({
        success: false,
        error: 'Unauthorized',
      });
      return;
    }

    req.claims = claims;

    if (!hasPermission(claims.role, permission)) {
      res.status(403).json({
        success: false,
        error: `Missing permission: ${permission}`,
      });
      return;
    }

    next();
  };
}

export function requireAnyRole(roles: UserRole[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!config.rbacEnforced) {
      next();
      return;
    }

    const claims = req.claims || claimsFromRequest(req);
    if (!claims) {
      res.status(401).json({
        success: false,
        error: 'Unauthorized',
      });
      return;
    }

    req.claims = claims;

    if (!hasAnyRole(claims.role, roles)) {
      res.status(403).json({
        success: false,
        error: 'Insufficient role for this action',
      });
      return;
    }

    next();
  };
}
