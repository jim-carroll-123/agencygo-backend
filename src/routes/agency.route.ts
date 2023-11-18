import { AgencyController } from '@/controllers/agency.controller';
import { CreateAgencyDto } from '@/dtos/agency.dto';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { Routes } from '@interfaces/routes.interface';
import { AuthMiddleware, isAdminMiddleware } from '@/middlewares/auth.middleware';
import { UploadMiddleware } from '@middlewares/upload.middleware';
import { Router } from 'express';

export class AgencyRoute implements Routes {
  public path = '/agency';
  public router = Router();
  public agency = new AgencyController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/:id`, AuthMiddleware, isAdminMiddleware, ValidationMiddleware(CreateAgencyDto, true), this.agency.createAgency);
    this.router.get(
      `${this.path}/:agencyId`,
      //  AuthMiddleware,
      this.agency.getsingleagency,
    );
    this.router.delete(`${this.path}/delete-agency/:agencyId`, AuthMiddleware, isAdminMiddleware, this.agency.deleteAgency);
    this.router.get(
      `${this.path}`,
      //  AuthMiddleware,
      this.agency.getAgency,
    );
    this.router.patch(
      `${this.path}/update-agency/:agencyId`,
      // AuthMiddleware, isAdminMiddleware,
      UploadMiddleware.single('agencyLogo'),
      this.agency.updateAgency,
    );
    this.router.post(`${this.path}/addgroup/:parentAgencyId`, this.agency.addSubGroup);
    this.router.get(`${this.path}/showgroup/:agencyId`, this.agency.showSubGroup);
    this.router.patch(`${this.path}/updategroup/:groupId`, this.agency.updateGroup);
    this.router.delete(`${this.path}/deletegroup/:agencyId`, this.agency.deleteGroup);
  }
}
