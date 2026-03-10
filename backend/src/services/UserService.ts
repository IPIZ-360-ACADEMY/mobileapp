import { User, CreateUserDTO, UpdateUserDTO, UserRole } from '../models/User';

export class UserService {
  // In-memory storage for skeleton - replace with database later
  private users: User[] = [];
  private nextId = 1;

  async createUser(dto: CreateUserDTO): Promise<User> {
    const user: User = {
      id: this.nextId.toString(),
      ...dto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.users.push(user);
    this.nextId++;

    return user;
  }

  async getUserById(id: string): Promise<User | null> {
    return this.users.find(user => user.id === id) || null;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.users.find(user => user.email === email) || null;
  }

  async getUsersByRole(role: UserRole): Promise<User[]> {
    return this.users.filter(user => user.role === role);
  }

  async updateUser(id: string, dto: UpdateUserDTO): Promise<User | null> {
    const index = this.users.findIndex(user => user.id === id);
    if (index === -1) return null;

    this.users[index] = {
      ...this.users[index],
      ...dto,
      updatedAt: new Date(),
    };

    return this.users[index];
  }

  async deleteUser(id: string): Promise<boolean> {
    const index = this.users.findIndex(user => user.id === id);
    if (index === -1) return false;

    this.users.splice(index, 1);
    return true;
  }

  async getAllUsers(): Promise<User[]> {
    return [...this.users];
  }
}