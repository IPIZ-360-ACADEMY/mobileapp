import {
  ClassGradebookEntry,
  StudentAcademicOverview,
  StudentEvaluation,
  StudentPerformanceSummary,
  StudentSubjectResult,
} from '../models/StudentAcademic';
import { Subject } from '../models/Subject';
import { User, UserRole } from '../models/User';
import { classGroupService } from './ClassGroupService';
import { subjectService } from './SubjectService';
import { userService } from './UserService';
import { AcademicEvaluationRecord, AcademicGradeRecord, dataStore } from '../storage/dataStore';

type AppError = Error & {
  statusCode?: number;
};

function createAppError(message: string, statusCode: number): AppError {
  const error = new Error(message) as AppError;
  error.statusCode = statusCode;
  return error;
}

function roundToOneDecimal(value: number): number {
  return Math.round(value * 10) / 10;
}

function buildSeed(input: string): number {
  let hash = 0;
  for (let index = 0; index < input.length; index += 1) {
    hash = (hash * 31 + input.charCodeAt(index)) % 100000;
  }

  return Math.abs(hash);
}

function scoreFromSeed(seed: number, min: number, max: number): number {
  const ratio = (seed % 1000) / 1000;
  return roundToOneDecimal(min + ratio * (max - min));
}

function formatUserDisplayName(user: User): string {
  const fullName = `${user.firstName} ${user.lastName}`.trim();
  return fullName || user.email;
}

export class StudentAcademicService {
  private createDefaultGradeRecord(studentUserId: string, subjectId: string): AcademicGradeRecord {
    const baseSeed = buildSeed(`${studentUserId}:${subjectId}`);

    return {
      studentUserId,
      subjectId,
      continuousAssessment: scoreFromSeed(baseSeed + 17, 10.5, 18.8),
      projectScore: scoreFromSeed(baseSeed + 29, 9.8, 19.2),
      examScore: scoreFromSeed(baseSeed + 41, 8.4, 18.7),
      attendanceRate: Math.min(99, Math.round(78 + ((baseSeed + 7) % 22))),
      updatedAt: new Date(),
    };
  }

  private getOrCreateGradeRecord(studentUserId: string, subjectId: string): AcademicGradeRecord {
    let gradeRecord: AcademicGradeRecord | null = null;

    dataStore.update((state) => {
      const existingRecord = state.academicGrades.find(
        (record) => record.studentUserId === studentUserId && record.subjectId === subjectId,
      );

      if (existingRecord) {
        gradeRecord = existingRecord;
        return;
      }

      const createdRecord = this.createDefaultGradeRecord(studentUserId, subjectId);
      state.academicGrades.push(createdRecord);
      gradeRecord = createdRecord;
    });

    if (!gradeRecord) {
      throw createAppError('Failed to persist academic grade record', 500);
    }

    return gradeRecord;
  }

  private getOrCreateEvaluationRecord(
    classGroupId: string,
    subject: Subject,
  ): AcademicEvaluationRecord {
    let evaluationRecord: AcademicEvaluationRecord | null = null;

    dataStore.update((state) => {
      const existingRecord = state.academicEvaluations.find(
        (evaluation) =>
          evaluation.classGroupId === classGroupId &&
          evaluation.subjectId === subject.id,
      );

      if (existingRecord) {
        evaluationRecord = existingRecord;
        return;
      }

      const baseSeed = buildSeed(`${classGroupId}:evaluation:${subject.id}`);
      const daysAhead = 2 + (baseSeed % 18);
      const scheduledAt = new Date(Date.now() + daysAhead * 24 * 60 * 60 * 1000).toISOString();
      const now = new Date();

      const createdRecord: AcademicEvaluationRecord = {
        id: state.counters.academicEvaluationNextId.toString(),
        classGroupId,
        subjectId: subject.id,
        title: `Exame de ${subject.name}`,
        kind: 'exam',
        scheduledAt,
        weightPercentage: 40,
        createdAt: now,
        updatedAt: now,
      };

      state.academicEvaluations.push(createdRecord);
      state.counters.academicEvaluationNextId += 1;
      evaluationRecord = createdRecord;
    });

    if (!evaluationRecord) {
      throw createAppError('Failed to persist academic evaluation record', 500);
    }

    return evaluationRecord;
  }

  private async getTeacherName(teacherId?: string): Promise<string | undefined> {
    if (!teacherId) {
      return undefined;
    }

    const teacher = await userService.getUserById(teacherId);
    if (!teacher) {
      return undefined;
    }

    return formatUserDisplayName(teacher);
  }

  private async buildSubjectResult(student: User, subject: Subject): Promise<StudentSubjectResult> {
    const gradeRecord = this.getOrCreateGradeRecord(student.id, subject.id);
    const teacherName = await this.getTeacherName(subject.teacherId);
    const finalAverage = roundToOneDecimal(
      gradeRecord.continuousAssessment * 0.35 +
        gradeRecord.projectScore * 0.25 +
        gradeRecord.examScore * 0.4,
    );
    const status = finalAverage >= 10 ? 'approved' : 'attention';

    return {
      subjectId: subject.id,
      subjectName: subject.name,
      subjectCode: subject.code,
      teacherName,
      continuousAssessment: gradeRecord.continuousAssessment,
      projectScore: gradeRecord.projectScore,
      examScore: gradeRecord.examScore,
      finalAverage,
      attendanceRate: gradeRecord.attendanceRate,
      status,
    };
  }

  private buildSummary(
    subjectResults: StudentSubjectResult[],
    classGradebook: ClassGradebookEntry[],
    studentUserId: string,
  ): StudentPerformanceSummary {
    const approvedSubjects = subjectResults.filter((subject) => subject.status === 'approved').length;
    const attentionSubjects = subjectResults.length - approvedSubjects;
    const generalAverage =
      subjectResults.length > 0
        ? roundToOneDecimal(
            subjectResults.reduce((total, subject) => total + subject.finalAverage, 0) /
              subjectResults.length,
          )
        : 0;
    const attendanceRate =
      subjectResults.length > 0
        ? Math.round(
            subjectResults.reduce((total, subject) => total + subject.attendanceRate, 0) /
              subjectResults.length,
          )
        : 0;
    const bestSubject = [...subjectResults].sort(
      (left, right) => right.finalAverage - left.finalAverage,
    )[0];
    const ownRank = classGradebook.find((entry) => entry.studentUserId === studentUserId)?.rank || 0;

    return {
      generalAverage,
      attendanceRate,
      approvedSubjects,
      attentionSubjects,
      completionRate: subjectResults.length > 0 ? Math.round((approvedSubjects / subjectResults.length) * 100) : 0,
      classRank: ownRank,
      classSize: classGradebook.length,
      bestSubjectName: bestSubject?.subjectName,
      bestAverage: bestSubject?.finalAverage,
    };
  }

  private async buildClassGradebook(studentClassmates: User[], subjects: Subject[]): Promise<ClassGradebookEntry[]> {
    const rawEntries = await Promise.all(
      studentClassmates.map(async (classmate) => {
        const subjectResults = await Promise.all(
          subjects.map((subject) => this.buildSubjectResult(classmate, subject)),
        );
        const finalAverage =
          subjectResults.length > 0
            ? roundToOneDecimal(
                subjectResults.reduce((total, subject) => total + subject.finalAverage, 0) /
                  subjectResults.length,
              )
            : 0;

        return {
          studentUserId: classmate.id,
          studentName: formatUserDisplayName(classmate),
          finalAverage,
          status: finalAverage >= 10 ? 'approved' : 'attention',
          rank: 0,
        } satisfies ClassGradebookEntry;
      }),
    );

    return rawEntries
      .sort((left, right) => right.finalAverage - left.finalAverage)
      .map((entry, index) => ({
        ...entry,
        rank: index + 1,
      }));
  }

  async getOverviewForStudent(studentUserId: string): Promise<StudentAcademicOverview> {
    const student = await userService.getUserById(studentUserId);
    if (!student) {
      throw createAppError('Student not found', 404);
    }

    if (student.role !== UserRole.STUDENT) {
      throw createAppError('Academic dashboard is only available for students', 403);
    }

    const classGroup = student.classGroupId
      ? await classGroupService.getClassGroupById(student.classGroupId)
      : null;

    if (!classGroup) {
      return {
        student: {
          userId: student.id,
          fullName: formatUserDisplayName(student),
          classGroupId: student.classGroupId,
        },
        summary: {
          generalAverage: 0,
          attendanceRate: 0,
          approvedSubjects: 0,
          attentionSubjects: 0,
          completionRate: 0,
          classRank: 0,
          classSize: 0,
        },
        subjectResults: [],
        upcomingEvaluations: [],
        classGradebook: [],
        emptyStateMessage: 'Este estudante ainda nao esta vinculado a uma turma ativa.',
      };
    }

    const subjects = (await subjectService.getSubjectsByClassGroup(classGroup.id)).filter(
      (subject) => subject.isActive,
    );
    const classmates = (await userService.getStudentsByClassGroup(classGroup.id)).filter(
      (user) => user.isActive,
    );
    const classmatesWithFallback = classmates.some((classmate) => classmate.id === student.id)
      ? classmates
      : [...classmates, student];
    const subjectNameById = new Map(subjects.map((subject) => [subject.id, subject.name]));
    const subjectResults = await Promise.all(
      subjects.map((subject) => this.buildSubjectResult(student, subject)),
    );
    const upcomingEvaluations = subjects
      .map((subject) => this.getOrCreateEvaluationRecord(classGroup.id, subject))
      .map(
        (evaluationRecord): StudentEvaluation => ({
          id: evaluationRecord.id,
          subjectId: evaluationRecord.subjectId,
          subjectName:
            subjectNameById.get(evaluationRecord.subjectId) || 'Disciplina',
          title: evaluationRecord.title,
          kind: evaluationRecord.kind,
          scheduledAt: evaluationRecord.scheduledAt,
          weightPercentage: evaluationRecord.weightPercentage,
        }),
      )
      .sort((left, right) => left.scheduledAt.localeCompare(right.scheduledAt));
    const classGradebook = await this.buildClassGradebook(classmatesWithFallback, subjects);
    const summary = this.buildSummary(subjectResults, classGradebook, student.id);

    return {
      student: {
        userId: student.id,
        fullName: formatUserDisplayName(student),
        classGroupId: classGroup.id,
        classGroupName: classGroup.name,
        classGroupCode: classGroup.code,
        academicYear: classGroup.academicYear,
        term: classGroup.term,
      },
      summary,
      subjectResults,
      upcomingEvaluations,
      classGradebook,
      emptyStateMessage:
        subjects.length === 0
          ? 'A turma deste estudante ainda nao possui disciplinas ativas configuradas.'
          : undefined,
    };
  }
}

export const studentAcademicService = new StudentAcademicService();