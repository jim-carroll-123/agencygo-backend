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
    this.router.post(`${this.path}/:id`, AuthMiddleware, ValidationMiddleware(CreateEmployeeDto), this.employee.createEmployee);
    this.router.get(`${this.path}s/:agencyId`, AuthMiddleware, this.employee.getEmployees);
    this.router.get(`${this.path}/getEmployeeById/:employeeId`, AuthMiddleware, isAdminMiddleware, this.employee.getEmployee);
    this.router.patch(
      `${this.path}/:employeeId`,
      AuthMiddleware,
      isAdminMiddleware,
      ValidationMiddleware(UpdateEmployeeDto, true),
      this.employee.updateEmployee,
    );
    this.router.get(`${this.path}/search/data`, this.employee.searchEmployee);
    this.router.delete(`${this.path}/:employeeId`, AuthMiddleware, this.employee.deleteEmployee);
    this.router.put(
      `${this.path}/role/:employeeId`,
      AuthMiddleware,
      isAdminMiddleware,
      ValidationMiddleware(AssignRoleDto, true),
      this.employee.assignRoleToEmployee,
    );
    this.router.put(`${this.path}`, AuthMiddleware, isAdminMiddleware, this.employee.updateBatchEmployee);
    this.router.delete(`${this.path}`, this.employee.deleteBatchEmployeeById);
  }
}
