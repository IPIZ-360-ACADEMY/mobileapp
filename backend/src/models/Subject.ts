export interface Subject {
  id: string;
  name: string;
  code: string;
  workloadHours: number;
  classGroupId: string;
  teacherId?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateSubjectDTO {
  name: string;
  code: string;
  workloadHours: number;
  classGroupId: string;
  teacherId?: string;
  isActive?: boolean;
}

export interface UpdateSubjectDTO {
  name?: string;
  code?: string;
  workloadHours?: number;
  classGroupId?: string;
  teacherId?: string;
  isActive?: boolean;
}
