import { CreatorController } from '@/controllers/creator.controller';
import { CreatorDTO } from '@/dtos/creator.dto';
import { Routes } from '@/interfaces/routes.interface';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { Router } from 'express';

export class CreatorRoute implements Routes {
  public path = '/creator';
  public router = Router();
  public creator = new CreatorController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, ValidationMiddleware(CreatorDTO), this.creator.createCreator);
    this.router.delete(`${this.path}/:id`, this.creator._deleteCreator);
  }
}
