import { Router } from 'express';
import { SmartTagController } from '@/controllers/smartTagController';
import { CreateSmartTagDto } from '@/dtos/smartTag.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';

export class smartTagRoute implements Routes {
  public path = '/smarttag';
  public router = Router();
  public smartTag = new SmartTagController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.smartTag.getSmartTags);
    this.router.get(`${this.path}/:id`, this.smartTag.getSmartTagById);
    this.router.post(`${this.path}`, ValidationMiddleware(CreateSmartTagDto), this.smartTag.createSmartTag);
    this.router.delete(`${this.path}/:id`, this.smartTag.deleteSmartTag);
    this.router.put(`${this.path}/:id`, ValidationMiddleware(CreateSmartTagDto, true), this.smartTag.updateSmartTag);
  }
}
