import { EmployeeController } from '@/controllers/employee.controller';
import { AssignRoleDto, CreateEmployeeDto, UpdateEmployeeDto } from '@/dtos/employees.dto';
import { AuthMiddleware, isAdminMiddleware } from '@/middlewares/auth.middleware';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { Routes } from '@interfaces/routes.interface';
import { Router } from 'express';

export class EmployeeRoute implements Routes {
  public path = '/employee';
  public router = Router();
  public employee = new EmployeeController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/:id`, AuthMiddleware, isAdminMiddleware, ValidationMiddleware(CreateEmployeeDto), this.employee.createEmployee);
    this.router.get(`${this.path}/:agencyId`, AuthMiddleware, this.employee.getEmployees);
    this.router.get(`${this.path}/:employeeId`, AuthMiddleware, isAdminMiddleware, this.employee.getEmployee);
    this.router.put(
      `${this.path}/:employeeId`,
      AuthMiddleware,
      isAdminMiddleware,
      ValidationMiddleware(UpdateEmployeeDto),
      this.employee.updateEmployee,
    );

    this.router.delete(`${this.path}/:employeeId`, AuthMiddleware, isAdminMiddleware, this.employee.deleteEmployee);
    this.router.put(
      `${this.path}/role/:employeeId`,
      AuthMiddleware,
      isAdminMiddleware,
      ValidationMiddleware(AssignRoleDto, true),
      this.employee.assignRoleToEmployee,
    );
  }
}
