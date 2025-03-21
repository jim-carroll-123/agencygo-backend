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
    this.router.get(
      `${this.path}/get-image-list-by-creator-and-folder/:createorId/:folderName`,
      AuthMiddleware,
      this.contentController.getImageListBycreatorAndFolder,
    );
    this.router.delete(`${this.path}/delete`, AuthMiddleware, this.contentController.deleteContent);
    this.router.patch(`${this.path}/update/presignedurl`, AuthMiddleware, this.contentController.updatePresignedUrl);
  }
}
