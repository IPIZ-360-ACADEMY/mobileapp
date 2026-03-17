import { ClassGroup, CreateClassGroupDTO, UpdateClassGroupDTO } from '../models/ClassGroup';
import { dataStore } from '../storage/dataStore';

export class ClassGroupService {
  async createClassGroup(dto: CreateClassGroupDTO): Promise<ClassGroup> {
    let classGroup: ClassGroup | null = null;

    dataStore.update((state) => {
      classGroup = {
        id: state.counters.classGroupNextId.toString(),
        ...dto,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      state.classGroups.push(classGroup);
      state.counters.classGroupNextId += 1;
    });

    if (!classGroup) {
      throw new Error('Failed to persist class group');
    }

    return classGroup;
  }

  async getClassGroupById(id: string): Promise<ClassGroup | null> {
    return dataStore.getSnapshot().classGroups.find((item) => item.id === id) || null;
  }

  async getAllClassGroups(): Promise<ClassGroup[]> {
    return dataStore.getSnapshot().classGroups;
  }

  async updateClassGroup(id: string, dto: UpdateClassGroupDTO): Promise<ClassGroup | null> {
    let updated: ClassGroup | null = null;

    dataStore.update((state) => {
      const index = state.classGroups.findIndex((item) => item.id === id);
      if (index === -1) {
        updated = null;
        return;
      }

      state.classGroups[index] = {
        ...state.classGroups[index],
        ...dto,
        updatedAt: new Date(),
      };

      updated = state.classGroups[index];
    });

    return updated;
  }

  async deleteClassGroup(id: string): Promise<boolean> {
    let deleted = false;

    dataStore.update((state) => {
      const index = state.classGroups.findIndex((item) => item.id === id);
      if (index === -1) {
        deleted = false;
        return;
      }

      state.classGroups.splice(index, 1);
      deleted = true;
    });

    return deleted;
  }
}

export const classGroupService = new ClassGroupService();
