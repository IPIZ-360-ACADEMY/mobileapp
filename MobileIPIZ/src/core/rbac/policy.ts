export enum AppRole {
  STUDENT = 'student',
  TEACHER = 'teacher',
  ADMIN = 'admin',
  COMPANY = 'company',
  ALUMNI = 'alumni',
  SUPER_ROOT = 'super_root',
}

export enum AppPermission {
  USER_CREATE = 'user:create',
  USER_READ = 'user:read',
  USER_UPDATE = 'user:update',
  USER_DELETE = 'user:delete',
  USER_ASSIGN_ROLE = 'user:assign_role',

  SYSTEM_AUDIT = 'system:audit',

  JOB_READ = 'job:read',
  JOB_CREATE = 'job:create',
  JOB_UPDATE = 'job:update',
  JOB_DELETE = 'job:delete',

  COMPANY_READ = 'company:read',
  COMPANY_CREATE = 'company:create',
  COMPANY_UPDATE = 'company:update',
  COMPANY_DELETE = 'company:delete',

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

type PermissionMap = Record<AppRole, ReadonlySet<AppPermission>>;

const allPermissions: ReadonlySet<AppPermission> = new Set(Object.values(AppPermission));

const permissionMap: PermissionMap = {
  [AppRole.SUPER_ROOT]: allPermissions,
  [AppRole.ADMIN]: new Set([
    AppPermission.USER_CREATE,
    AppPermission.USER_READ,
    AppPermission.USER_UPDATE,
    AppPermission.USER_ASSIGN_ROLE,
    AppPermission.JOB_READ,
    AppPermission.JOB_CREATE,
    AppPermission.JOB_UPDATE,
    AppPermission.JOB_DELETE,
    AppPermission.COMPANY_READ,
    AppPermission.COMPANY_CREATE,
    AppPermission.COMPANY_UPDATE,
    AppPermission.COMPANY_DELETE,
    AppPermission.CLASS_CREATE,
    AppPermission.CLASS_READ,
    AppPermission.CLASS_UPDATE,
    AppPermission.CLASS_DELETE,
    AppPermission.SUBJECT_CREATE,
    AppPermission.SUBJECT_READ,
    AppPermission.SUBJECT_UPDATE,
    AppPermission.SUBJECT_DELETE,
    AppPermission.POST_CREATE,
    AppPermission.POST_READ,
    AppPermission.POST_UPDATE,
    AppPermission.POST_DELETE,
    AppPermission.POST_COMMENT,
    AppPermission.POST_REACT,
    AppPermission.POST_MODERATE,
  ]),
  [AppRole.COMPANY]: new Set([
    AppPermission.JOB_READ,
    AppPermission.JOB_CREATE,
    AppPermission.JOB_UPDATE,
    AppPermission.COMPANY_READ,
    AppPermission.POST_CREATE,
    AppPermission.POST_READ,
    AppPermission.POST_UPDATE,
    AppPermission.POST_DELETE,
    AppPermission.POST_COMMENT,
    AppPermission.POST_REACT,
  ]),
  [AppRole.TEACHER]: new Set([
    AppPermission.CLASS_READ,
    AppPermission.SUBJECT_READ,
    AppPermission.JOB_READ,
    AppPermission.COMPANY_READ,
    AppPermission.POST_CREATE,
    AppPermission.POST_READ,
    AppPermission.POST_UPDATE,
    AppPermission.POST_DELETE,
    AppPermission.POST_COMMENT,
    AppPermission.POST_REACT,
  ]),
  [AppRole.STUDENT]: new Set([
    AppPermission.CLASS_READ,
    AppPermission.SUBJECT_READ,
    AppPermission.JOB_READ,
    AppPermission.COMPANY_READ,
    AppPermission.POST_CREATE,
    AppPermission.POST_READ,
    AppPermission.POST_UPDATE,
    AppPermission.POST_DELETE,
    AppPermission.POST_COMMENT,
    AppPermission.POST_REACT,
    AppPermission.ACADEMIC_READ_SELF,
  ]),
  [AppRole.ALUMNI]: new Set([
    AppPermission.JOB_READ,
    AppPermission.COMPANY_READ,
    AppPermission.POST_CREATE,
    AppPermission.POST_READ,
    AppPermission.POST_UPDATE,
    AppPermission.POST_DELETE,
    AppPermission.POST_COMMENT,
    AppPermission.POST_REACT,
  ]),
};

const roleLabelMap: Record<AppRole, string> = {
  [AppRole.SUPER_ROOT]: 'Super Root',
  [AppRole.ADMIN]: 'Administrador',
  [AppRole.COMPANY]: 'Empresa',
  [AppRole.TEACHER]: 'Professor',
  [AppRole.STUDENT]: 'Estudante',
  [AppRole.ALUMNI]: 'Ex-Aluno',
};

export function getPermissionsForRole(role: AppRole): AppPermission[] {
  return Array.from(permissionMap[role]);
}

export function hasAppPermission(role: AppRole, permission: AppPermission): boolean {
  return permissionMap[role].has(permission);
}

export function getRoleLabel(role: AppRole): string {
  return roleLabelMap[role];
}
