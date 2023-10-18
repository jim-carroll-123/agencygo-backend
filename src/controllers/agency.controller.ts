import { Agency } from '@/interfaces/agency.interface';
import { AgencyService } from '@/services/agency.service';
import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { uploadToS3 } from '@/utils/fileUpload';
import path from 'path';

export class AgencyController {
  public agency = Container.get(AgencyService);
  public createAgency = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const agencyData: Agency = req.body;
      const userId = req.params.id;
      const createAgencyData: Agency = await this.agency.createAgency(agencyData, userId);

      res.status(201).json({ data: createAgencyData, message: 'Agency created Successfully' });
    } catch (error) {
      next(error);
    }
  };

  public getAgency = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllUsersAgency: Agency[] = await this.agency.getAllAgency();
      res.status(200).json({ data: findAllUsersAgency, message: 'success' });
    } catch (error) {
      next(error);
    }
  };

  public updateAgency = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const agencyId = req.params.agencyId;
      const agencyData: Agency = req.body;
      if (req.file) {
        const originalnameWithoutSpaces = req.file.originalname.replace(/\s/g, '');
        const result = await uploadToS3(req.file.buffer, originalnameWithoutSpaces + Date.now() + path.extname(req.file.originalname));
        agencyData.agencyLogo = result.Location;
      }
      const updatedAgency = await this.agency.updateAgency(agencyId, agencyData);
      res.status(200).json({ data: updatedAgency, message: 'Agency updated successfully' });
    } catch (error) {
      next(error);
    }
  };

  public deleteAgency = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const agencyId = req.params.agencyId;
      const deleteAgencyData: Agency = await this.agency.deleteAgency(agencyId);
      res.status(200).json({ data: deleteAgencyData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}
