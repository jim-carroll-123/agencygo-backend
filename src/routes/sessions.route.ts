import { SessionsController } from '@/controllers/sessions.controller';
import { CreateSessionServerDTO } from '@/dtos/sessions.dto';
import { Routes } from '@/interfaces/routes.interface';
import { UploadMiddleware } from '@/middlewares/upload.middleware';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { Router } from 'express';

export class SessionsRoute implements Routes {
  public path = '/sessions';
  public router = Router();
  public sessions = new SessionsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/client/:id`, UploadMiddleware.single('file'), this.sessions.createSessionClient);
    this.router.post(`${this.path}/server/:id`, ValidationMiddleware(CreateSessionServerDTO), this.sessions.createSessionServer);
    this.router.get(`${this.path}/client/:id`, this.sessions.getSessionClient);
  }
}
