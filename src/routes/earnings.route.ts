import { EarningsController } from '@/controllers/earnings.controller';
import { Routes } from '@/interfaces/routes.interface';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { Router } from 'express';

export class EarningsRoute implements Routes {
  public path = '/earnings';
  public router = Router();
  public earnings = new EarningsController();

  constructor() {
    this.initalizeRoutes();
  }

  private initalizeRoutes() {
    this.router.get(`${this.path}/:agencyId`, AuthMiddleware, this.earnings.getEarnings);
  }
}
