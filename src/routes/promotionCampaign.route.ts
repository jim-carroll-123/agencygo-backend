import { Router } from 'express';
import { PromotionCampaignController } from '@/controllers/promotionCampaign.controller';
import { PromotionCampaignDto, UpdatePromotionCampaignDto } from '@/dtos/promotionCampaign.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
export class PromotionCampaignRoute implements Routes {
  public path = '/promotion';
  public router = Router();
  public promotionCampaign = new PromotionCampaignController();
  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.get(`${this.path}`, AuthMiddleware, this.promotionCampaign.getPromotionCampaigns);
    this.router.get(`${this.path}/agency/:id`, AuthMiddleware, this.promotionCampaign.getPromotionCampaignByAgencyId);
    this.router.get(`${this.path}/:id`, AuthMiddleware, this.promotionCampaign.getPromotionCampaignById);
    this.router.post(`${this.path}`, AuthMiddleware, ValidationMiddleware(PromotionCampaignDto), this.promotionCampaign.createPromotionCampaign);
    this.router.delete(`${this.path}/:id`, AuthMiddleware, this.promotionCampaign.deletePromotionCampaign);
    this.router.put(
      `${this.path}/:id`,
      AuthMiddleware,
      ValidationMiddleware(PromotionCampaignDto, true),
      this.promotionCampaign.updatePromotionCampaign,
    );
    this.router.put(
      `${this.path}/:id/reactivatepromotions`,
      AuthMiddleware,
      ValidationMiddleware(UpdatePromotionCampaignDto),
      this.promotionCampaign.reactivatePromotionCampaigns,
    );
  }
}

