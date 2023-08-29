import { EmployeeController } from '@/controllers/employee.controller';
import { CreateEmployeeDto } from '@/dtos/employees.dto';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
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
    this.router.post(`${this.path}/:id`, AuthMiddleware, ValidationMiddleware(CreateEmployeeDto, 'body'), this.employee.createEmployee);
  }
}
