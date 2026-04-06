import { CreateSubjectDTO, Subject, UpdateSubjectDTO } from '../models/Subject';
import { dataStore } from '../storage/dataStore';

export class SubjectService {
  async createSubject(dto: CreateSubjectDTO): Promise<Subject> {
    let subject: Subject | null = null;

    dataStore.update((state) => {
      subject = {
        id: state.counters.subjectNextId.toString(),
        ...dto,
        isActive: dto.isActive ?? true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      state.subjects.push(subject);
      state.counters.subjectNextId += 1;
    });

    if (!subject) {
      throw new Error('Failed to persist subject');
    }

    return subject;
  }

  async getAllSubjects(): Promise<Subject[]> {
    return dataStore.getSnapshot().subjects;
  }

  async getSubjectById(id: string): Promise<Subject | null> {
    return dataStore.getSnapshot().subjects.find((item) => item.id === id) || null;
  }

  async getSubjectsByClassGroup(classGroupId: string): Promise<Subject[]> {
    return dataStore
      .getSnapshot()
      .subjects.filter((item) => item.classGroupId === classGroupId);
  }

  async updateSubject(id: string, dto: UpdateSubjectDTO): Promise<Subject | null> {
    let updated: Subject | null = null;

    dataStore.update((state) => {
      const index = state.subjects.findIndex((item) => item.id === id);
      if (index === -1) {
        updated = null;
        return;
      }

      state.subjects[index] = {
        ...state.subjects[index],
        ...dto,
        updatedAt: new Date(),
      };

      updated = state.subjects[index];
    });

    return updated;
  }

  async deleteSubject(id: string): Promise<boolean> {
    let deleted = false;

    dataStore.update((state) => {
      const index = state.subjects.findIndex((item) => item.id === id);
      if (index === -1) {
        deleted = false;
        return;
      }

      state.subjects.splice(index, 1);
      deleted = true;
    });

    return deleted;
  }
}

export const subjectService = new SubjectService();
