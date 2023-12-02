import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { TimelineController } from '@/controllers/timeline.controller';

export class TimelineRoute implements Routes {
  public path = '/timeline';
  public router = Router();
  public timelineControl = new TimelineController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/create`, AuthMiddleware, this.timelineControl.createTimelineData);
    this.router.get(`${this.path}/getTimelineData/:timelineId?`, AuthMiddleware, this.timelineControl.getTimelineData);
    this.router.get(`${this.path}/getTimelineDataAll`, AuthMiddleware, this.timelineControl.getTimelineDataAll);
    this.router.delete(`${this.path}/delete/:timelineId`, AuthMiddleware, this.timelineControl.deleteById);
  }
}
