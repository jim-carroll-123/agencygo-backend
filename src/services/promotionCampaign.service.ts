import { PromotionCampaign } from '@/interfaces/promotionCampaign.interface';
import { Service } from 'typedi';
import { HttpException } from '@/exceptions/httpException';
import { promotionCampaignModel } from '@/models/promotionCampaign.model';

@Service()
export class PromotionCampaignService {
  public async createPromotionCampaign(promotionCampaignData: PromotionCampaign): Promise<PromotionCampaign> {
    try {
      const newPromotionCampaign = new promotionCampaignModel({
        ...promotionCampaignData,
        createdAt: Date.now(),
        isExpired: false,
      });

      // Save the PromotionCampaigns
      const createdPromotionCampaign = await newPromotionCampaign.save();
      return createdPromotionCampaign;
    } catch (error) {
      throw `Create: ${error.message}`;
    }
  }

  public async getPromotionCampaigns(): Promise<PromotionCampaign[]> {
    try {
      const promotionCampaigns: PromotionCampaign[] = await promotionCampaignModel.find();
      return promotionCampaigns;
    } catch (error) {
      throw new HttpException(500, `Get: ${error.message}`);
    }
  }

  public async getPromotionCampaignById(promotionCampaignId: string) {
    const findPromotionCampaign: PromotionCampaign = await promotionCampaignModel.findOne({ _id: promotionCampaignId });
    if (!findPromotionCampaign) throw new HttpException(409, "Get: promotion campaign doesn't exist");

    return findPromotionCampaign;
  }

  public async updatePromotionCampaign(promotionCampaignId: string, promotionCampaignData: PromotionCampaign) {
    try {
      const updatePromotionCampaign = await promotionCampaignModel.findByIdAndUpdate(
        promotionCampaignId,
        { ...promotionCampaignData, updatedAt: Date.now() },
        { new: true },
      );

      if (!updatePromotionCampaign) {
        throw new HttpException(404, 'promotion campaign not found.');
      }

      return updatePromotionCampaign;
    } catch (error) {
      throw new HttpException(500, `Update: ${error.message}`);
    }
  }
  public async deletePromotionCampaign(promotionCampaignId: string): Promise<void> {
    try {
      const role = await promotionCampaignModel.findByIdAndRemove(promotionCampaignId);

      if (!role) {
        throw new HttpException(404, 'promotion campaign not found');
      }
    } catch (error) {
      throw new HttpException(500, `Delete: ${error.message}`);
    }
  }
  public async getPromotionCampaignsByAgencyId(agencyId: string) {
    console.log(agencyId, 'agencyId');
    const findAgencyPromotionCampaign: PromotionCampaign[] = await promotionCampaignModel.find({ agencyId });
    if (!findAgencyPromotionCampaign) throw new HttpException(409, "Get: agency didn't have any promotion campaigns yet");
    return findAgencyPromotionCampaign;
  }
  public async reactivateExpiredPromotions(creatorId: string, update: any) {
    try {
      const changes = { isExpired: true, ...update, updatedAt: Date.now() };
      const condition = { creatorId, isExpired: false };
      const reactivated = await promotionCampaignModel.updateMany(condition, changes);
      console.log(reactivated.modifiedCount);
      if (!reactivated) {
        throw new HttpException(404, 'no promotions to reactivated.');
      }
      return promotionCampaignModel.find({ creatorId });
    } catch (error) {
      throw new HttpException(500, `reactivate: ${error.message}`);
    }
  }
}
