import { Router } from 'express';
import { SmartTagController } from '@/controllers/smartTagController';
import { CreateSmartTagDto } from '@/dtos/smartTag.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
export class SmartTagRoute implements Routes {
  public path = '/smarttag';
  public router = Router();
  public smartTag = new SmartTagController();
  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.get(`${this.path}`, AuthMiddleware, this.smartTag.getSmartTags);
    this.router.get(`${this.path}/:id`, AuthMiddleware, this.smartTag.getSmartTagById);
    this.router.post(`${this.path}`, AuthMiddleware, ValidationMiddleware(CreateSmartTagDto), this.smartTag.createSmartTag);
    this.router.delete(`${this.path}/:id`, AuthMiddleware, this.smartTag.deleteSmartTag);
    this.router.put(`${this.path}/:id`, AuthMiddleware, ValidationMiddleware(CreateSmartTagDto, true), this.smartTag.updateSmartTag);
  }
}
