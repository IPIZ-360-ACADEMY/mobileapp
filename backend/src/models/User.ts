export interface User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  isActive: boolean;
  classGroupId?: string;
  department?: string;
  positionTitle?: string;
  profilePicture?: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum UserRole {
  STUDENT = 'student',
  TEACHER = 'teacher',
  COMPANY = 'company',
  ADMIN = 'admin',
  ALUMNI = 'alumni',
  SUPER_ROOT = 'super_root',
}

export interface CreateUserDTO {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  isActive?: boolean;
  classGroupId?: string;
  department?: string;
  positionTitle?: string;
}

export interface UpdateUserDTO {
  email?: string;
  firstName?: string;
  lastName?: string;
  profilePicture?: string;
  role?: UserRole;
  isActive?: boolean;
  classGroupId?: string;
  department?: string;
  positionTitle?: string;
}

export type SafeUser = Omit<User, 'password'>;

export function sanitizeUser(user: User): SafeUser {
  const { password: _password, ...safeUser } = user;
  return safeUser;
}