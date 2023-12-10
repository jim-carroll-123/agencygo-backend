import { Tier } from '@/interfaces/tier.interface';
import { TierService } from '@/services/tier.service';
import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';

export class TierController {
  private readonly tierService: TierService;
  constructor() {
    this.tierService = new TierService();
  }
  public tier = Container.get(TierService);

  public createTier = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tierData: Tier = req.body;
      const createTierData: Tier = await this.tier.createTier(tierData);

      res.status(201).json({ data: createTierData, message: 'Tier created Successfully' });
    } catch (error) {
      next(error);
    }
  };
  public getTiers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const getAllTiers: Tier[] = await this.tier.getTiers();
      res.status(200).json({ data: getAllTiers, message: 'findAllTiers' });
    } catch (error) {
      next(error);
    }
  };

  public getTierById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tierId: string = req.params.id;
      const findOneTierData: Tier = await this.tier.getTierById(tierId);

      res.status(200).json({ data: findOneTierData, message: 'findOneTier' });
    } catch (error) {
      next(error);
    }
  };
  public updateTier = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tierId: string = req.params.id;
      const tierData: Tier = req.body;
      const updateTierData: Tier = await this.tier.updateTier(tierId, tierData);

      res.status(200).json({ data: updateTierData, message: 'tier updated successfully' });
    } catch (error) {
      next(error);
    }
  };
  public deleteTier = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tierId: string = req.params.id;
      const deleteTierData = await this.tier.deleteTier(tierId);
      res.status(200).json({ data: deleteTierData, message: 'tier deleted successfully' });
    } catch (error) {
      next(error);
    }
  };
}
