export enum UserRole {
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
  ADMIN = 'ADMIN',
  COMPANY = 'COMPANY',
  ALUMNI = 'ALUMNI',
}

export enum AcademicLevel {
  NONE = 'NONE',
  TECHNICAL_SPECIALIZATION = 'TECHNICAL_SPECIALIZATION',
  BACHELOR = 'BACHELOR',
  POSTGRADUATE = 'POSTGRADUATE',
  MASTER = 'MASTER',
  PHD = 'PHD',
}

export enum EmploymentStatus {
  EMPLOYED = 'EMPLOYED',
  SELF_EMPLOYED = 'SELF_EMPLOYED',
  UNEMPLOYED = 'UNEMPLOYED',
  STUDYING = 'STUDYING',
  INTERNSHIP = 'INTERNSHIP',
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  createdAt: string;
}

export interface AlumniProfile {
  id: string;
  userId: string;
  graduationYear: number;
  courseCompleted: string;
  currentAcademicLevel: AcademicLevel;
  employmentStatus: EmploymentStatus;
  companyName?: string;
  jobTitle?: string;
  industrySector?: string;
  monthlyIncomeRange?: string;
  country: string;
  professionalSkills: string[];
  availableForMentorship: boolean;
  willingToRecruitStudents: boolean;
  lastUpdatedAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
