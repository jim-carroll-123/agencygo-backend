import { Schema, model, Document } from 'mongoose';
import { PromotionCampaign } from '@interfaces/promotionCampaign.interface';
const PromotionCampaignSchema = new Schema<PromotionCampaign>({
  agencyId: {
    type: Schema.Types.ObjectId,
  },
  creatorId: {
    type: Schema.Types.ObjectId,
  },
  userType: {
    type: String,
  },
  activityType: {
    type: String,
    required: true,
  },
  offerLimit: {
    type: String || Number,
    required: true,
  },
  offerExpiry: {
    type: String || Number,
    required: true,
  },
  message: {
    type: String,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
  },
  isExpired: {
    type: Boolean,
  },
});

export const promotionCampaignModel = model<PromotionCampaign & Document>('Promotions', PromotionCampaignSchema);
