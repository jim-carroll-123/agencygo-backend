import { Router } from 'express';
import { SmartTagController } from '@/controllers/smarttags.controller';
import { CreateSmartTagsDto } from '@/dtos/smarttags.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';

export class smartTagsRoute implements Routes {
  public path = '/smarttags';
  public router = Router();
  public smartTag = new SmartTagController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.smartTag.getSmartTags);
    this.router.get(`${this.path}/:id`, this.smartTag.getSmartTagById);
    this.router.post(`${this.path}`, ValidationMiddleware(CreateSmartTagsDto), this.smartTag.createSmartTag);
    this.router.delete(`${this.path}/:id`, this.smartTag.deleteSmartTag);
    this.router.put(`${this.path}/:id`, ValidationMiddleware(CreateSmartTagsDto, true), this.smartTag.updateSmartTag);
  }
}
