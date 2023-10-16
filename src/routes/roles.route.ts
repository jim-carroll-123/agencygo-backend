import { Router } from 'express';
import { RoleController } from '@controllers/role.controller';
import { Routes } from '@interfaces/routes.interface';
import { CreateRoleDto } from '@dtos/role.dto';
import { ValidationMiddleware } from '@middlewares/validation.middleware';

export class RoleRoute implements Routes {
  public path = '/roles';
  public router = Router();
  public role = new RoleController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, ValidationMiddleware(CreateRoleDto, true), this.role.createRole);
    this.router.get(`${this.path}`, this.role.getRole);
    this.router.patch(`${this.path}/:id`, this.role.updateRole);
    this.router.delete(`${this.path}/:id`, this.role.deleteRole);
  }
}
