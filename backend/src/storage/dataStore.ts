import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { config } from '../config/environment';
import { ClassGroup } from '../models/ClassGroup';
import {
  Post,
  PostComment,
  PostReaction,
  PostReactionKind,
  PostStatus,
} from '../models/Post';
import { Subject } from '../models/Subject';
import { User, UserRole } from '../models/User';

export type AcademicEvaluationKind = 'test' | 'project' | 'exam';

export interface AcademicGradeRecord {
  studentUserId: string;
  subjectId: string;
  continuousAssessment: number;
  projectScore: number;
  examScore: number;
  attendanceRate: number;
  updatedAt: Date;
}

export interface AcademicEvaluationRecord {
  id: string;
  classGroupId: string;
  subjectId: string;
  title: string;
  kind: AcademicEvaluationKind;
  scheduledAt: string;
  weightPercentage: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface RefreshSessionRecord {
  tokenId: string;
  userId: string;
  expiresAt: number;
  revoked: boolean;
  updatedAt: Date;
}

interface DataStoreCounters {
  userNextId: number;
  classGroupNextId: number;
  subjectNextId: number;
  postNextId: number;
  postCommentNextId: number;
  academicEvaluationNextId: number;
}

export interface DataStoreState {
  counters: DataStoreCounters;
  users: User[];
  classGroups: ClassGroup[];
  subjects: Subject[];
  posts: Post[];
  academicGrades: AcademicGradeRecord[];
  academicEvaluations: AcademicEvaluationRecord[];
  refreshSessions: RefreshSessionRecord[];
}

type RawObject = Record<string, unknown>;

const USER_ROLES = new Set(Object.values(UserRole));
const POST_STATUSES = new Set(Object.values(PostStatus));
const REACTION_KINDS = new Set(Object.values(PostReactionKind));
const EVALUATION_KINDS = new Set<AcademicEvaluationKind>(['test', 'project', 'exam']);

function resolveDataStorePath(): string {
  const configuredPath = config.dataStorePath || '.data/app-store.json';
  if (path.isAbsolute(configuredPath)) {
    return configuredPath;
  }

  return path.resolve(process.cwd(), configuredPath);
}

function coerceString(value: unknown, fallback = ''): string {
  if (typeof value === 'string') {
    return value;
  }

  return fallback;
}

function coerceNumber(value: unknown, fallback = 0): number {
  const parsed = Number(value);
  if (Number.isFinite(parsed)) {
    return parsed;
  }

  return fallback;
}

function parseDate(value: unknown, fallback = new Date()): Date {
  if (typeof value === 'string' || typeof value === 'number') {
    const parsedDate = new Date(value);
    if (!Number.isNaN(parsedDate.getTime())) {
      return parsedDate;
    }
  }

  return fallback;
}

function parseUserRole(value: unknown): UserRole {
  if (typeof value === 'string' && USER_ROLES.has(value as UserRole)) {
    return value as UserRole;
  }

  return UserRole.STUDENT;
}

function parsePostStatus(value: unknown): PostStatus {
  if (typeof value === 'string' && POST_STATUSES.has(value as PostStatus)) {
    return value as PostStatus;
  }

  return PostStatus.PENDING;
}

function parseReactionKind(value: unknown): PostReactionKind {
  if (typeof value === 'string' && REACTION_KINDS.has(value as PostReactionKind)) {
    return value as PostReactionKind;
  }

  return PostReactionKind.LIKE;
}

function parseEvaluationKind(value: unknown): AcademicEvaluationKind {
  if (typeof value === 'string' && EVALUATION_KINDS.has(value as AcademicEvaluationKind)) {
    return value as AcademicEvaluationKind;
  }

  return 'exam';
}

function mapUser(raw: unknown): User | null {
  if (!raw || typeof raw !== 'object') {
    return null;
  }

  const rawUser = raw as RawObject;
  const id = coerceString(rawUser.id).trim();
  const email = coerceString(rawUser.email).trim().toLowerCase();
  const password = coerceString(rawUser.password);

  if (!id || !email || !password) {
    return null;
  }

  return {
    id,
    email,
    password,
    firstName: coerceString(rawUser.firstName),
    lastName: coerceString(rawUser.lastName),
    role: parseUserRole(rawUser.role),
    isActive: rawUser.isActive === false ? false : true,
    classGroupId: coerceString(rawUser.classGroupId) || undefined,
    department: coerceString(rawUser.department) || undefined,
    positionTitle: coerceString(rawUser.positionTitle) || undefined,
    profilePicture: coerceString(rawUser.profilePicture) || undefined,
    createdAt: parseDate(rawUser.createdAt),
    updatedAt: parseDate(rawUser.updatedAt),
  };
}

function mapClassGroup(raw: unknown): ClassGroup | null {
  if (!raw || typeof raw !== 'object') {
    return null;
  }

  const rawClass = raw as RawObject;
  const id = coerceString(rawClass.id).trim();
  const name = coerceString(rawClass.name).trim();
  const code = coerceString(rawClass.code).trim();

  if (!id || !name || !code) {
    return null;
  }

  return {
    id,
    name,
    code,
    academicYear: coerceString(rawClass.academicYear),
    term: coerceString(rawClass.term),
    capacity: coerceNumber(rawClass.capacity),
    coordinatorTeacherId: coerceString(rawClass.coordinatorTeacherId) || undefined,
    createdAt: parseDate(rawClass.createdAt),
    updatedAt: parseDate(rawClass.updatedAt),
  };
}

function mapSubject(raw: unknown): Subject | null {
  if (!raw || typeof raw !== 'object') {
    return null;
  }

  const rawSubject = raw as RawObject;
  const id = coerceString(rawSubject.id).trim();
  const classGroupId = coerceString(rawSubject.classGroupId).trim();

  if (!id || !classGroupId) {
    return null;
  }

  return {
    id,
    name: coerceString(rawSubject.name),
    code: coerceString(rawSubject.code),
    workloadHours: coerceNumber(rawSubject.workloadHours),
    classGroupId,
    teacherId: coerceString(rawSubject.teacherId) || undefined,
    isActive: rawSubject.isActive === false ? false : true,
    createdAt: parseDate(rawSubject.createdAt),
    updatedAt: parseDate(rawSubject.updatedAt),
  };
}

function mapPostComment(raw: unknown): PostComment | null {
  if (!raw || typeof raw !== 'object') {
    return null;
  }

  const rawComment = raw as RawObject;
  const id = coerceString(rawComment.id).trim();
  const authorUserId = coerceString(rawComment.authorUserId).trim();

  if (!id || !authorUserId) {
    return null;
  }

  return {
    id,
    authorUserId,
    authorName: coerceString(rawComment.authorName),
    authorRole: parseUserRole(rawComment.authorRole),
    content: coerceString(rawComment.content),
    createdAt: parseDate(rawComment.createdAt),
    updatedAt: parseDate(rawComment.updatedAt),
  };
}

function mapPostReaction(raw: unknown): PostReaction | null {
  if (!raw || typeof raw !== 'object') {
    return null;
  }

  const rawReaction = raw as RawObject;
  const userId = coerceString(rawReaction.userId).trim();
  if (!userId) {
    return null;
  }

  return {
    userId,
    kind: parseReactionKind(rawReaction.kind),
    reactedAt: parseDate(rawReaction.reactedAt),
  };
}

function mapPost(raw: unknown): Post | null {
  if (!raw || typeof raw !== 'object') {
    return null;
  }

  const rawPost = raw as RawObject;
  const id = coerceString(rawPost.id).trim();
  const authorUserId = coerceString(rawPost.authorUserId).trim();

  if (!id || !authorUserId) {
    return null;
  }

  const image =
    rawPost.image && typeof rawPost.image === 'object'
      ? (() => {
          const rawImage = rawPost.image as RawObject;
          const dataUrl = coerceString(rawImage.dataUrl).trim();
          const fileName = coerceString(rawImage.fileName).trim();
          const mimeType = coerceString(rawImage.mimeType).trim();

          if (!dataUrl || !fileName || !mimeType) {
            return undefined;
          }

          return {
            dataUrl,
            fileName,
            mimeType,
            sizeBytes: Math.max(0, Math.floor(coerceNumber(rawImage.sizeBytes))),
          };
        })()
      : undefined;

  const comments = Array.isArray(rawPost.comments)
    ? rawPost.comments
        .map(mapPostComment)
        .filter((comment): comment is PostComment => Boolean(comment))
    : [];

  const reactions = Array.isArray(rawPost.reactions)
    ? rawPost.reactions
        .map(mapPostReaction)
        .filter((reaction): reaction is PostReaction => Boolean(reaction))
    : [];

  return {
    id,
    authorUserId,
    authorName: coerceString(rawPost.authorName),
    authorRole: parseUserRole(rawPost.authorRole),
    content: coerceString(rawPost.content),
    image,
    comments,
    reactions,
    status: parsePostStatus(rawPost.status),
    verifiedByUserId: coerceString(rawPost.verifiedByUserId) || undefined,
    verifiedAt: rawPost.verifiedAt ? parseDate(rawPost.verifiedAt) : undefined,
    createdAt: parseDate(rawPost.createdAt),
    updatedAt: parseDate(rawPost.updatedAt),
  };
}

function mapAcademicGrade(raw: unknown): AcademicGradeRecord | null {
  if (!raw || typeof raw !== 'object') {
    return null;
  }

  const rawGrade = raw as RawObject;
  const studentUserId = coerceString(rawGrade.studentUserId).trim();
  const subjectId = coerceString(rawGrade.subjectId).trim();

  if (!studentUserId || !subjectId) {
    return null;
  }

  return {
    studentUserId,
    subjectId,
    continuousAssessment: coerceNumber(rawGrade.continuousAssessment),
    projectScore: coerceNumber(rawGrade.projectScore),
    examScore: coerceNumber(rawGrade.examScore),
    attendanceRate: coerceNumber(rawGrade.attendanceRate),
    updatedAt: parseDate(rawGrade.updatedAt),
  };
}

function mapAcademicEvaluation(raw: unknown): AcademicEvaluationRecord | null {
  if (!raw || typeof raw !== 'object') {
    return null;
  }

  const rawEvaluation = raw as RawObject;
  const id = coerceString(rawEvaluation.id).trim();
  const classGroupId = coerceString(rawEvaluation.classGroupId).trim();
  const subjectId = coerceString(rawEvaluation.subjectId).trim();

  if (!id || !classGroupId || !subjectId) {
    return null;
  }

  return {
    id,
    classGroupId,
    subjectId,
    title: coerceString(rawEvaluation.title),
    kind: parseEvaluationKind(rawEvaluation.kind),
    scheduledAt: coerceString(rawEvaluation.scheduledAt),
    weightPercentage: coerceNumber(rawEvaluation.weightPercentage),
    createdAt: parseDate(rawEvaluation.createdAt),
    updatedAt: parseDate(rawEvaluation.updatedAt),
  };
}

function mapRefreshSession(raw: unknown): RefreshSessionRecord | null {
  if (!raw || typeof raw !== 'object') {
    return null;
  }

  const rawSession = raw as RawObject;
  const tokenId = coerceString(rawSession.tokenId).trim();
  const userId = coerceString(rawSession.userId).trim();
  const expiresAt = Math.floor(coerceNumber(rawSession.expiresAt));

  if (!tokenId || !userId || expiresAt <= 0) {
    return null;
  }

  return {
    tokenId,
    userId,
    expiresAt,
    revoked: Boolean(rawSession.revoked),
    updatedAt: parseDate(rawSession.updatedAt),
  };
}

function getMaxNumericId(ids: string[]): number {
  return ids.reduce((maxValue, id) => {
    const parsed = Number.parseInt(id, 10);
    if (!Number.isFinite(parsed)) {
      return maxValue;
    }

    return parsed > maxValue ? parsed : maxValue;
  }, 0);
}

function normalizeNextCounter(value: unknown, fallback: number): number {
  const parsed = Math.floor(coerceNumber(value));
  if (parsed > 0) {
    return parsed;
  }

  return Math.max(1, fallback);
}

function createEmptyState(): DataStoreState {
  return {
    counters: {
      userNextId: 1,
      classGroupNextId: 1,
      subjectNextId: 1,
      postNextId: 1,
      postCommentNextId: 1,
      academicEvaluationNextId: 1,
    },
    users: [],
    classGroups: [],
    subjects: [],
    posts: [],
    academicGrades: [],
    academicEvaluations: [],
    refreshSessions: [],
  };
}

function loadStateFromDisk(filePath: string): DataStoreState {
  if (!existsSync(filePath)) {
    return createEmptyState();
  }

  try {
    const fileContent = readFileSync(filePath, 'utf-8').trim();
    if (!fileContent) {
      return createEmptyState();
    }

    const parsed = JSON.parse(fileContent) as unknown;
    if (!parsed || typeof parsed !== 'object') {
      return createEmptyState();
    }

    const rawState = parsed as RawObject;
    const users = Array.isArray(rawState.users)
      ? rawState.users.map(mapUser).filter((user): user is User => Boolean(user))
      : [];
    const classGroups = Array.isArray(rawState.classGroups)
      ? rawState.classGroups
          .map(mapClassGroup)
          .filter((classGroup): classGroup is ClassGroup => Boolean(classGroup))
      : [];
    const subjects = Array.isArray(rawState.subjects)
      ? rawState.subjects
          .map(mapSubject)
          .filter((subject): subject is Subject => Boolean(subject))
      : [];
    const posts = Array.isArray(rawState.posts)
      ? rawState.posts.map(mapPost).filter((post): post is Post => Boolean(post))
      : [];
    const academicGrades = Array.isArray(rawState.academicGrades)
      ? rawState.academicGrades
          .map(mapAcademicGrade)
          .filter((grade): grade is AcademicGradeRecord => Boolean(grade))
      : [];
    const academicEvaluations = Array.isArray(rawState.academicEvaluations)
      ? rawState.academicEvaluations
          .map(mapAcademicEvaluation)
          .filter(
            (evaluation): evaluation is AcademicEvaluationRecord =>
              Boolean(evaluation),
          )
      : [];
    const refreshSessions = Array.isArray(rawState.refreshSessions)
      ? rawState.refreshSessions
          .map(mapRefreshSession)
          .filter(
            (session): session is RefreshSessionRecord =>
              Boolean(session),
          )
      : [];

    const rawCounters =
      rawState.counters && typeof rawState.counters === 'object'
        ? (rawState.counters as RawObject)
        : ({} as RawObject);
    const maxPostCommentId = getMaxNumericId(
      posts.flatMap((post) => post.comments.map((comment) => comment.id)),
    );

    return {
      counters: {
        userNextId: normalizeNextCounter(
          rawCounters.userNextId,
          getMaxNumericId(users.map((item) => item.id)) + 1,
        ),
        classGroupNextId: normalizeNextCounter(
          rawCounters.classGroupNextId,
          getMaxNumericId(classGroups.map((item) => item.id)) + 1,
        ),
        subjectNextId: normalizeNextCounter(
          rawCounters.subjectNextId,
          getMaxNumericId(subjects.map((item) => item.id)) + 1,
        ),
        postNextId: normalizeNextCounter(
          rawCounters.postNextId,
          getMaxNumericId(posts.map((item) => item.id)) + 1,
        ),
        postCommentNextId: normalizeNextCounter(
          rawCounters.postCommentNextId,
          maxPostCommentId + 1,
        ),
        academicEvaluationNextId: normalizeNextCounter(
          rawCounters.academicEvaluationNextId,
          getMaxNumericId(academicEvaluations.map((item) => item.id)) + 1,
        ),
      },
      users,
      classGroups,
      subjects,
      posts,
      academicGrades,
      academicEvaluations,
      refreshSessions,
    };
  } catch {
    return createEmptyState();
  }
}

function persistStateToDisk(filePath: string, state: DataStoreState): void {
  const directoryPath = path.dirname(filePath);
  if (!existsSync(directoryPath)) {
    mkdirSync(directoryPath, { recursive: true });
  }

  writeFileSync(filePath, `${JSON.stringify(state, null, 2)}\n`, 'utf-8');
}

class FileDataStore {
  private readonly filePath: string;
  private state: DataStoreState;

  constructor(filePath: string) {
    this.filePath = filePath;
    this.state = loadStateFromDisk(filePath);
    this.persist();
  }

  getSnapshot(): DataStoreState {
    return structuredClone(this.state);
  }

  update(mutator: (state: DataStoreState) => void): DataStoreState {
    const draft = structuredClone(this.state);
    mutator(draft);
    this.state = draft;
    this.persist();

    return structuredClone(this.state);
  }

  getLocation(): string {
    return this.filePath;
  }

  private persist(): void {
    persistStateToDisk(this.filePath, this.state);
  }
}

export const dataStore = new FileDataStore(resolveDataStorePath());
