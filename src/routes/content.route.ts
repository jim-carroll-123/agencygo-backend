import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { ContentController } from '@/controllers/content.controller';

export class ContentRoute implements Routes {
  public path = '/content';
  public router = Router();
  public contentController = new ContentController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/upload`, AuthMiddleware, this.contentController.uploadContentToS3);
  }
}
