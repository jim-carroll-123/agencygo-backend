import { PromotionCampaign } from '@/interfaces/promotionCampaign.interface';
import { PromotionCampaignService } from '@/services/promotionCampaign.service';
import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';

export class PromotionCampaignController {
  private readonly promotionCampaignService: PromotionCampaignService;
  constructor() {
    this.promotionCampaignService = new PromotionCampaignService();
  }
  public promotionCampaign = Container.get(PromotionCampaignService);

  public createPromotionCampaign = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const promotionCampaignData: PromotionCampaign = req.body;
      const createPromotionCampaignData: PromotionCampaign = await this.promotionCampaign.createPromotionCampaign(promotionCampaignData);

      res.status(201).json({ data: createPromotionCampaignData, message: 'PromotionCampaigns created Successfully' });
    } catch (error) {
      next(error);
    }
  };
  public getPromotionCampaigns = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const getAllPromotionCampaigns: PromotionCampaign[] = await this.promotionCampaign.getPromotionCampaigns();
      res.status(200).json({ data: getAllPromotionCampaigns, message: 'findAllPromotionCampaigns' });
    } catch (error) {
      next(error);
    }
  };

  public getPromotionCampaignById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const promotionCampaignId: string = req.params.id;
      const findOnePromotionCampaignData: PromotionCampaign = await this.promotionCampaign.getPromotionCampaignById(promotionCampaignId);
      res.status(200).json({ data: findOnePromotionCampaignData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };
  public getPromotionCampaignByAgencyId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const agencyId: string = req.params.id;
      const findAllAgencyPromotionCampaigns: PromotionCampaign[] = await this.promotionCampaign.getPromotionCampaignsByAgencyId(agencyId);
      res.status(200).json({ data: findAllAgencyPromotionCampaigns, message: 'agency promotions findOne' });
    } catch (error) {
      next(error);
    }
  };

  public updatePromotionCampaign = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const promotionCampaignId: string = req.params.id;
      const promotionCampaignData: PromotionCampaign = req.body;
      const updatePromotionCampaignData: PromotionCampaign = await this.promotionCampaign.updatePromotionCampaign(
        promotionCampaignId,
        promotionCampaignData,
      );

      res.status(200).json({ data: updatePromotionCampaignData, message: 'promotion campaign updated successfully' });
    } catch (error) {
      next(error);
    }
  };
  public deletePromotionCampaign = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const promotionCampaignId: string = req.params.id;
      const deletePromotionCampaignData = await this.promotionCampaign.deletePromotionCampaign(promotionCampaignId);
      res.status(200).json({ data: deletePromotionCampaignData, message: 'promotion campaign deleted' });
    } catch (error) {
      next(error);
    }
  };

  public reactivatePromotionCampaigns = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const creatorId: string = req.params.id;
      const offerExpiry: any = req.body;
      const reactivatedPromotions = await this.promotionCampaign.reactivateExpiredPromotions(creatorId, offerExpiry);
      res.status(200).json({ data: reactivatedPromotions, message: 'expired promotions reactivated' });
    } catch (error) {
      next(error);
    }
  };
}
