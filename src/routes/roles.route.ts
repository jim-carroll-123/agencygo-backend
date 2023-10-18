import { Router } from 'express';
import { RoleController } from '@controllers/role.controller';
import { Routes } from '@interfaces/routes.interface';
import { CreateRoleDto, UpdateRoleDto } from '@dtos/role.dto';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { AuthMiddleware, isAdminMiddleware } from '@/middlewares/auth.middleware';

export class RoleRoute implements Routes {
  public path = '/roles';
  public router = Router();
  public role = new RoleController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, AuthMiddleware, isAdminMiddleware, ValidationMiddleware(CreateRoleDto, true), this.role.createRole);
    this.router.get(`${this.path}`, AuthMiddleware, this.role.getRole);
    this.router.patch(`${this.path}/:id`, AuthMiddleware, isAdminMiddleware, ValidationMiddleware(UpdateRoleDto, true), this.role.updateRole);
    this.router.delete(`${this.path}/:id`, AuthMiddleware, isAdminMiddleware, this.role.deleteRole);
    this.router.get(`${this.path}/search/data`, AuthMiddleware, this.role.searchRole);
  }
}
