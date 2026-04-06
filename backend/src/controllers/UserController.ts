import { Request, Response, NextFunction } from 'express';
import { userService } from '../services/UserService';
import { CreateUserDTO, UpdateUserDTO, UserRole, sanitizeUser } from '../models/User';

export class UserController {
  async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const dto: CreateUserDTO = req.body;
      const user = await userService.createUser(dto);
      res.status(201).json({
        success: true,
        data: sanitizeUser(user),
      });
    } catch (error) {
      next(error);
    }
  }

  async getUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const user = await userService.getUserById(id);

      if (!user) {
        res.status(404).json({
          success: false,
          error: 'User not found',
        });
        return;
      }

      res.json({
        success: true,
        data: sanitizeUser(user),
      });
    } catch (error) {
      next(error);
    }
  }

  async getUsersByRole(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { role } = req.params;
      const users = await userService.getUsersByRole(role as UserRole);
      res.json({
        success: true,
        data: users.map(sanitizeUser),
      });
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const dto: UpdateUserDTO = req.body;
      const user = await userService.updateUser(id, dto);

      if (!user) {
        res.status(404).json({
          success: false,
          error: 'User not found',
        });
        return;
      }

      res.json({
        success: true,
        data: sanitizeUser(user),
      });
    } catch (error) {
      next(error);
    }
  }

  async assignUserRole(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const { role } = req.body as { role?: UserRole };

      if (!role) {
        res.status(400).json({
          success: false,
          error: 'Role is required',
        });
        return;
      }

      const user = await userService.assignUserRole(id, role);

      if (!user) {
        res.status(404).json({
          success: false,
          error: 'User not found',
        });
        return;
      }

      res.json({
        success: true,
        data: sanitizeUser(user),
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const deleted = await userService.deleteUser(id);

      if (!deleted) {
        res.status(404).json({
          success: false,
          error: 'User not found',
        });
        return;
      }

      res.json({
        success: true,
        message: 'User deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const users = await userService.getAllUsers();
      res.json({
        success: true,
        data: users.map(sanitizeUser),
      });
    } catch (error) {
      next(error);
    }
  }
}