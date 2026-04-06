import { User, CreateUserDTO, UpdateUserDTO, UserRole } from '../models/User';
import { hashPassword } from '../auth/password';
import { config } from '../config/environment';
import { classGroupService } from './ClassGroupService';
import { dataStore } from '../storage/dataStore';

type AppError = Error & {
  statusCode?: number;
};

export class UserService {
  constructor() {
    this.bootstrapSuperRoot();
  }

  private normalizeEmail(email: string): string {
    return email.trim().toLowerCase();
  }

  private async normalizeClassGroupId(classGroupId?: string): Promise<string | undefined> {
    const normalizedClassGroupId = classGroupId?.trim();
    if (!normalizedClassGroupId) {
      return undefined;
    }

    const classGroup = await classGroupService.getClassGroupById(normalizedClassGroupId);
    if (!classGroup) {
      const error = new Error('Class group not found') as AppError;
      error.statusCode = 400;
      throw error;
    }

    return normalizedClassGroupId;
  }

  private bootstrapSuperRoot(): void {
    if (!config.superRootEmail || !config.superRootPassword) {
      return;
    }

    dataStore.update((state) => {
      const alreadyExists = state.users.some((user) => user.email === config.superRootEmail);
      if (alreadyExists) {
        return;
      }

      const now = new Date();
      const superRoot: User = {
        id: state.counters.userNextId.toString(),
        email: config.superRootEmail,
        password: hashPassword(config.superRootPassword),
        firstName: 'Super',
        lastName: 'Root',
        role: UserRole.SUPER_ROOT,
        isActive: true,
        department: 'Governanca Digital',
        positionTitle: 'Super Root',
        createdAt: now,
        updatedAt: now,
      };

      state.users.push(superRoot);
      state.counters.userNextId += 1;
    });
  }

  async createUser(dto: CreateUserDTO): Promise<User> {
    const normalizedEmail = this.normalizeEmail(dto.email);
    const normalizedClassGroupId = await this.normalizeClassGroupId(dto.classGroupId);
    let createdUser: User | null = null;

    dataStore.update((state) => {
      const alreadyExists = state.users.some((user) => user.email === normalizedEmail);
      if (alreadyExists) {
        const error = new Error('Email already registered') as AppError;
        error.statusCode = 409;
        throw error;
      }

      createdUser = {
        id: state.counters.userNextId.toString(),
        ...dto,
        email: normalizedEmail,
        password: hashPassword(dto.password),
        isActive: dto.isActive ?? true,
        classGroupId: dto.role === UserRole.STUDENT ? normalizedClassGroupId : undefined,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      state.users.push(createdUser);
      state.counters.userNextId += 1;
    });

    if (!createdUser) {
      throw new Error('Failed to persist user');
    }

    return createdUser;
  }

  async getUserById(id: string): Promise<User | null> {
    return dataStore.getSnapshot().users.find((user) => user.id === id) || null;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const normalizedEmail = this.normalizeEmail(email);
    return dataStore.getSnapshot().users.find((user) => user.email === normalizedEmail) || null;
  }

  async getUsersByRole(role: UserRole): Promise<User[]> {
    return dataStore.getSnapshot().users.filter((user) => user.role === role);
  }

  async getStudentsByClassGroup(classGroupId: string): Promise<User[]> {
    return dataStore.getSnapshot().users.filter(
      (user) => user.role === UserRole.STUDENT && user.classGroupId === classGroupId,
    );
  }

  async updateUser(id: string, dto: UpdateUserDTO): Promise<User | null> {
    const { role: _role, ...safeDto } = dto;
    const normalizedClassGroupId = await this.normalizeClassGroupId(safeDto.classGroupId);

    const normalizedEmail = safeDto.email ? this.normalizeEmail(safeDto.email) : undefined;
    let updatedUser: User | null = null;

    dataStore.update((state) => {
      const index = state.users.findIndex((user) => user.id === id);
      if (index === -1) {
        updatedUser = null;
        return;
      }

      if (normalizedEmail) {
        const emailInUseByAnotherUser = state.users.some(
          (user) => user.email === normalizedEmail && user.id !== id,
        );

        if (emailInUseByAnotherUser) {
          const error = new Error('Email already registered') as AppError;
          error.statusCode = 409;
          throw error;
        }
      }

      state.users[index] = {
        ...state.users[index],
        ...safeDto,
        ...(normalizedEmail ? { email: normalizedEmail } : {}),
        ...(safeDto.classGroupId !== undefined
          ? {
              classGroupId:
                state.users[index].role === UserRole.STUDENT ? normalizedClassGroupId : undefined,
            }
          : {}),
        updatedAt: new Date(),
      };

      updatedUser = state.users[index];
    });

    return updatedUser;
  }

  async assignUserRole(id: string, role: UserRole): Promise<User | null> {
    let updatedUser: User | null = null;

    dataStore.update((state) => {
      const index = state.users.findIndex((user) => user.id === id);
      if (index === -1) {
        updatedUser = null;
        return;
      }

      state.users[index] = {
        ...state.users[index],
        role,
        classGroupId: role === UserRole.STUDENT ? state.users[index].classGroupId : undefined,
        updatedAt: new Date(),
      };

      updatedUser = state.users[index];
    });

    return updatedUser;
  }

  async deleteUser(id: string): Promise<boolean> {
    let deleted = false;

    dataStore.update((state) => {
      const index = state.users.findIndex((user) => user.id === id);
      if (index === -1) {
        deleted = false;
        return;
      }

      state.users.splice(index, 1);
      deleted = true;
    });

    return deleted;
  }

  async getAllUsers(): Promise<User[]> {
    return dataStore.getSnapshot().users;
  }
}

export const userService = new UserService();