import { Agency } from '@/interfaces/agency.interface';
import { AgencyService } from '@/services/agency.service';
import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';

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
}
