import Container from 'typedi';
import { NextFunction, Request, Response } from 'express';
import { EarningsService } from '@/services/earnings.service';

export class EarningsController {
  public earnings = Container.get(EarningsService);

  public getEarnings = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const agencyId = req.params.agencyId;
      const agencyEarnings = await this.earnings.getEarnings(agencyId);
      console.log(agencyEarnings);
      res.status(200).json({ data: agencyEarnings, message: 'success' });
    } catch (error) {
      next(error);
    }
  };
}
