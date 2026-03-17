import { UserRole } from '../models/User';

export enum Permission {
  USER_CREATE = 'user:create',
  USER_READ = 'user:read',
  USER_UPDATE = 'user:update',
  USER_DELETE = 'user:delete',
  USER_ASSIGN_ROLE = 'user:assign_role',

  JOB_CREATE = 'job:create',
  JOB_UPDATE = 'job:update',
  JOB_DELETE = 'job:delete',
  JOB_READ = 'job:read',

  COMPANY_CREATE = 'company:create',
  COMPANY_UPDATE = 'company:update',
  COMPANY_DELETE = 'company:delete',
  COMPANY_READ = 'company:read',

  CLASS_CREATE = 'class:create',
  CLASS_READ = 'class:read',
  CLASS_UPDATE = 'class:update',
  CLASS_DELETE = 'class:delete',

  SUBJECT_CREATE = 'subject:create',
  SUBJECT_READ = 'subject:read',
  SUBJECT_UPDATE = 'subject:update',
  SUBJECT_DELETE = 'subject:delete',

  POST_CREATE = 'post:create',
  POST_READ = 'post:read',
  POST_UPDATE = 'post:update',
  POST_DELETE = 'post:delete',
  POST_COMMENT = 'post:comment',
  POST_REACT = 'post:react',
  POST_MODERATE = 'post:moderate',

  ACADEMIC_READ_SELF = 'academic:read_self',
}

type RolePolicy = Record<UserRole, ReadonlySet<Permission>>;

const allPermissions: ReadonlySet<Permission> = new Set(Object.values(Permission));

export const rolePermissions: RolePolicy = {
  [UserRole.SUPER_ROOT]: allPermissions,
  [UserRole.ADMIN]: new Set([
    Permission.USER_CREATE,
    Permission.USER_READ,
    Permission.USER_UPDATE,
    Permission.USER_ASSIGN_ROLE,
    Permission.JOB_CREATE,
    Permission.JOB_UPDATE,
    Permission.JOB_DELETE,
    Permission.JOB_READ,
    Permission.COMPANY_CREATE,
    Permission.COMPANY_UPDATE,
    Permission.COMPANY_DELETE,
    Permission.COMPANY_READ,
    Permission.CLASS_CREATE,
    Permission.CLASS_READ,
    Permission.CLASS_UPDATE,
    Permission.CLASS_DELETE,
    Permission.SUBJECT_CREATE,
    Permission.SUBJECT_READ,
    Permission.SUBJECT_UPDATE,
    Permission.SUBJECT_DELETE,
    Permission.POST_CREATE,
    Permission.POST_READ,
    Permission.POST_UPDATE,
    Permission.POST_DELETE,
    Permission.POST_COMMENT,
    Permission.POST_REACT,
    Permission.POST_MODERATE,
  ]),
  [UserRole.COMPANY]: new Set([
    Permission.JOB_CREATE,
    Permission.JOB_UPDATE,
    Permission.JOB_READ,
    Permission.COMPANY_READ,
    Permission.POST_CREATE,
    Permission.POST_READ,
    Permission.POST_UPDATE,
    Permission.POST_DELETE,
    Permission.POST_COMMENT,
    Permission.POST_REACT,
  ]),
  [UserRole.TEACHER]: new Set([
    Permission.CLASS_READ,
    Permission.SUBJECT_READ,
    Permission.JOB_READ,
    Permission.COMPANY_READ,
    Permission.POST_CREATE,
    Permission.POST_READ,
    Permission.POST_UPDATE,
    Permission.POST_DELETE,
    Permission.POST_COMMENT,
    Permission.POST_REACT,
  ]),
  [UserRole.STUDENT]: new Set([
    Permission.CLASS_READ,
    Permission.SUBJECT_READ,
    Permission.JOB_READ,
    Permission.COMPANY_READ,
    Permission.POST_CREATE,
    Permission.POST_READ,
    Permission.POST_UPDATE,
    Permission.POST_DELETE,
    Permission.POST_COMMENT,
    Permission.POST_REACT,
    Permission.ACADEMIC_READ_SELF,
  ]),
  [UserRole.ALUMNI]: new Set([
    Permission.JOB_READ,
    Permission.COMPANY_READ,
    Permission.POST_CREATE,
    Permission.POST_READ,
    Permission.POST_UPDATE,
    Permission.POST_DELETE,
    Permission.POST_COMMENT,
    Permission.POST_REACT,
  ]),
};

export function hasPermission(role: UserRole, permission: Permission): boolean {
  return rolePermissions[role].has(permission);
}

export function hasAnyRole(current: UserRole, allowed: UserRole[]): boolean {
  return allowed.includes(current);
}

export function listPermissionsForRole(role: UserRole): Permission[] {
  return Array.from(rolePermissions[role]);
}
