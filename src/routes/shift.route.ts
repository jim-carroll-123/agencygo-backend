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
    this.router.get(`${this.path}`, this.shiftsController.getShifts);
    this.router.post(`${this.path}`, this.shiftsController.createShift);
    this.router.put(`${this.path}/:id`, this.shiftsController.updateShift);
    this.router.delete(`${this.path}/:id`, this.shiftsController.deleteShift);
  }
}
