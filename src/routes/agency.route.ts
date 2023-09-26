import { AgencyController } from '@/controllers/agency.controller';
import { CreateAgencyDto } from '@/dtos/agency.dto';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { Routes } from '@interfaces/routes.interface';
import { Router } from 'express';

export class AgencyRoute implements Routes {
  public path = '/agency';
  public router = Router();
  public agency = new AgencyController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/:id`, ValidationMiddleware(CreateAgencyDto, true), this.agency.createAgency);
    this.router.delete(`${this.path}/delete-agency/:agencyId`, this.agency.deleteAgency);
    this.router.get(`${this.path}`, this.agency.getAgency);
    this.router.patch(`${this.path}/update-agency/:agencyId`, this.agency.updateAgency);
  }
}
