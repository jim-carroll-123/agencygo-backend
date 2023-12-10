import { Router } from 'express';
import { TierController } from '@/controllers/tier.controller';
import { CreateTierDto } from '@/dtos/tier.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';

export class TierRoute implements Routes {
  public path = '/tier';
  public router = Router();
  public tier = new TierController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.tier.getTiers);
    this.router.get(`${this.path}/:id`, this.tier.getTierById);
    this.router.post(`${this.path}`, ValidationMiddleware(CreateTierDto), this.tier.createTier);
    this.router.delete(`${this.path}/:id`, this.tier.deleteTier);
    this.router.put(`${this.path}/:id`, ValidationMiddleware(CreateTierDto, true), this.tier.updateTier);
  }
}
