import { Router } from 'express';
import { PayrollController } from '@/controllers/payroll.controller';
import { CreatePayrollDto } from '@/dtos/payroll.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';

export class PayrollRoute implements Routes {
  public path = '/payroll';
  public router = Router();
  public payroll = new PayrollController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.payroll.getPayrolls);
    this.router.get(`${this.path}/:id`, this.payroll.getSinglePayroll);
    this.router.post(`${this.path}`, ValidationMiddleware(CreatePayrollDto), this.payroll.createPayroll);
    this.router.delete(`${this.path}/:id`, this.payroll.deletePayroll);
    this.router.put(`${this.path}/:id`, ValidationMiddleware(CreatePayrollDto, true), this.payroll.updatePayroll);
  }
}
