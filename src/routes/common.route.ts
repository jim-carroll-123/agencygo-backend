import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { EmailController } from '@controllers/common.controller';
import { ImageUpload } from '@controllers/common.controller';

export class EmailRoute implements Routes {
  public path = '/email';
  public router = Router();
  public emails = new EmailController();
  public image = new ImageUpload();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/:_id`, this.emails.sendEmail);
    this.router.post(`${this.path}/reset-password/:_id`, this.emails.sendEmailForResetPassword);
    this.router.post(`/uploadImage`, this.image.uploadImage);
  }
}
