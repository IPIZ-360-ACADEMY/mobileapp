export interface User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
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
}

export interface CreateUserDTO {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}

export interface UpdateUserDTO {
  firstName?: string;
  lastName?: string;
  profilePicture?: string;
}