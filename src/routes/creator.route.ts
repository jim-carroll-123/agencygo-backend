import { CreatorController } from '@/controllers/creator.controller';
import { CreatorDTO, CreatorLoginOFDTO } from '@/dtos/creator.dto';
import { Routes } from '@/interfaces/routes.interface';
import { UploadMiddleware } from '@/middlewares/upload.middleware';
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
    this.router.get(`${this.path}`, this.creator.getCreators);
    this.router.post(`${this.path}`, ValidationMiddleware(CreatorDTO), this.creator.createCreator);
    this.router.delete(`${this.path}/:id`, this.creator._deleteCreator);
    this.router.post(`${this.path}/of-linking/:id`, UploadMiddleware.single('file'), this.creator.linkingOnlyfans);
    this.router.post(`${this.path}/of-login/:id`, ValidationMiddleware(CreatorLoginOFDTO), this.creator.loginOnlyfans);
    this.router.get(`${this.path}/session/:id`, this.creator.getCreatorSession);
  }
}
