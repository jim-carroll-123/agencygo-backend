import { Router } from 'express';
import { SmartTagsController } from '@/controllers/smarttags.controller'; 
import { CreatesmartTagsDto } from '@/dtos/smarttags.dto'; 
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';

export class smartTagsRoute implements Routes {
  public path = '/smarttags';
  public router = Router();
  public imartTags = new SmartTagsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // this.router.get(`${this.path}`, this.imartTags.getsmartTags);
    // this.router.get(`${this.path}/:id`, this.imartTags.getsinglesmartTags);
    this.router.post(`${this.path}`, ValidationMiddleware(CreatesmartTagsDto), this.imartTags.createSmartTags);
//     this.router.delete(`${this.path}/:id`, this.imartTags.deletesmartTags);
// this.router.put(`${this.path}/:id`, ValidationMiddleware(CreatesmartTagsDto, true), this.imartTags.updatesmartTags);

}

}

