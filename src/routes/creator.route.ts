import { CreatorController } from '@/controllers/creator.controller';
import { CreatorDTO, CreatorCredsDTO } from '@/dtos/creator.dto';
import { Routes } from '@/interfaces/routes.interface';
import { AuthMiddleware, isAdminMiddleware } from '@/middlewares/auth.middleware';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { Router } from 'express';
import { UploadMiddleware } from '@middlewares/upload.middleware';

export class CreatorRoute implements Routes {
  public path = '/creators';
  public router = Router();
  public creator = new CreatorController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, AuthMiddleware, this.creator.getCreators);
    this.router.post(
      `${this.path}`,
      // AuthMiddleware,
      // isAdminMiddleware,
      UploadMiddleware.single('creatorImage'),
      ValidationMiddleware(CreatorDTO),
      this.creator.createCreator,
    );
    this.router.put(`${this.path}/:id`, ValidationMiddleware(CreatorDTO, true), this.creator.updateCreator);
    this.router.get(`${this.path}/getCreatorByAdmin/:creatorId`, AuthMiddleware, isAdminMiddleware, this.creator.getCreatorByAdmin);
    this.router.delete(`${this.path}/:id`, this.creator._deleteCreator);
    this.router.post(`${this.path}/assignCreatorToEmployee`, this.creator.assignCreatorToEmployee);
    this.router.get(`${this.path}/search`, this.creator.searchFilter);
    // Experimental Route
    this.router.post(`${this.path}/login-onlyfans`, ValidationMiddleware(CreatorCredsDTO), this.creator.loginOnlyfans);
    this.router.post(`${this.path}/scrape-financial-reports`, this.creator.scrapeCreatorFinananceReports);
  }
}
