import { httpRequest } from '../../../core/api/httpClient';

type ApiEnvelope<TData> = {
  success: boolean;
  data: TData;
  error?: string;
};

function unwrap<TData>(response: ApiEnvelope<TData>, fallbackMessage: string): TData {
  if (!response.success) {
    throw new Error(response.error || fallbackMessage);
  }

  return response.data;
}

export type StudentAcademicProfile = {
  userId: string;
  fullName: string;
  classGroupId?: string;
  classGroupName?: string;
  classGroupCode?: string;
  academicYear?: string;
  term?: string;
};

export type StudentPerformanceSummary = {
  generalAverage: number;
  attendanceRate: number;
  approvedSubjects: number;
  attentionSubjects: number;
  completionRate: number;
  classRank: number;
  classSize: number;
  bestSubjectName?: string;
  bestAverage?: number;
};

export type StudentSubjectResult = {
  subjectId: string;
  subjectName: string;
  subjectCode: string;
  teacherName?: string;
  continuousAssessment: number;
  projectScore: number;
  examScore: number;
  finalAverage: number;
  attendanceRate: number;
  status: 'approved' | 'attention';
};

export type StudentEvaluation = {
  id: string;
  subjectId: string;
  subjectName: string;
  title: string;
  kind: 'test' | 'project' | 'exam';
  scheduledAt: string;
  weightPercentage: number;
};

export type ClassGradebookEntry = {
  studentUserId: string;
  studentName: string;
  finalAverage: number;
  status: 'approved' | 'attention';
  rank: number;
};

export type StudentAcademicOverview = {
  student: StudentAcademicProfile;
  summary: StudentPerformanceSummary;
  subjectResults: StudentSubjectResult[];
  upcomingEvaluations: StudentEvaluation[];
  classGradebook: ClassGradebookEntry[];
  emptyStateMessage?: string;
};

export async function getStudentAcademicOverview(): Promise<StudentAcademicOverview> {
  const response = await httpRequest<ApiEnvelope<StudentAcademicOverview>>({
    method: 'GET',
    path: '/api/students/me/overview',
    retry: 0,
  });

  return unwrap(response, 'Falha ao carregar o painel academico.');
}