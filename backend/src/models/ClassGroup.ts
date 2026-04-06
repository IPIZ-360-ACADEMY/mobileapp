export interface ClassGroup {
  id: string;
  name: string;
  code: string;
  academicYear: string;
  term: string;
  capacity: number;
  coordinatorTeacherId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateClassGroupDTO {
  name: string;
  code: string;
  academicYear: string;
  term: string;
  capacity: number;
  coordinatorTeacherId?: string;
}

export interface UpdateClassGroupDTO {
  name?: string;
  code?: string;
  academicYear?: string;
  term?: string;
  capacity?: number;
  coordinatorTeacherId?: string;
}
