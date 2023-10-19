import { Router } from 'express';
import { ShiftsController } from '@controllers/shifts.controller';
import { ShiftsDto } from '@dtos/shifts.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';

export class ShiftRoute implements Routes {
  public path = '/shifts';
  public router = Router();
  public shiftsController = new ShiftsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, ValidationMiddleware, this.shiftsController.getShifts);
    this.router.post(`${this.path}`, ValidationMiddleware, this.shiftsController.createShift);
    // this.router.put(`${this.path}/:id`, ValidationMiddleware, this.shiftsController.updateShift);
    this.router.delete(`${this.path}/:id`, ValidationMiddleware, this.shiftsController.deleteShift);
    this.router.get(`${this.path}/employees`, ValidationMiddleware, this.shiftsController.getEmployees);
  }
}
