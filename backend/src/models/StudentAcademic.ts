export type AcademicSubjectStatus = 'approved' | 'attention';
export type AcademicEvaluationKind = 'test' | 'project' | 'exam';

export interface StudentAcademicProfile {
  userId: string;
  fullName: string;
  classGroupId?: string;
  classGroupName?: string;
  classGroupCode?: string;
  academicYear?: string;
  term?: string;
}

export interface StudentPerformanceSummary {
  generalAverage: number;
  attendanceRate: number;
  approvedSubjects: number;
  attentionSubjects: number;
  completionRate: number;
  classRank: number;
  classSize: number;
  bestSubjectName?: string;
  bestAverage?: number;
}

export interface StudentSubjectResult {
  subjectId: string;
  subjectName: string;
  subjectCode: string;
  teacherName?: string;
  continuousAssessment: number;
  projectScore: number;
  examScore: number;
  finalAverage: number;
  attendanceRate: number;
  status: AcademicSubjectStatus;
}

export interface StudentEvaluation {
  id: string;
  subjectId: string;
  subjectName: string;
  title: string;
  kind: AcademicEvaluationKind;
  scheduledAt: string;
  weightPercentage: number;
}

export interface ClassGradebookEntry {
  studentUserId: string;
  studentName: string;
  finalAverage: number;
  status: AcademicSubjectStatus;
  rank: number;
}

export interface StudentAcademicOverview {
  student: StudentAcademicProfile;
  summary: StudentPerformanceSummary;
  subjectResults: StudentSubjectResult[];
  upcomingEvaluations: StudentEvaluation[];
  classGradebook: ClassGradebookEntry[];
  emptyStateMessage?: string;
}