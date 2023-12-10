import { Router } from 'express';
import { TierController } from '@/controllers/tier.controller';
import { TierDto } from '@/dtos/tier.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
//import { AuthMiddleware } from '@/middlewares/auth.middleware';
export class TierRoute implements Routes {
  public path = '/tier';
  public router = Router();
  public tierController = new TierController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.tierController.getTiers);
    this.router.get(`${this.path}/:id`, this.tierController.getTierById);
    this.router.post(`${this.path}`, ValidationMiddleware(TierDto), this.tierController.createTier);
    this.router.delete(`${this.path}/:id`, this.tierController.deleteTier);
    this.router.put(`${this.path}/:id`, ValidationMiddleware(TierDto, true), this.tierController.updateTier);
  }
}
