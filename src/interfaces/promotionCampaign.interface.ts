import { Types } from 'mongoose';

export interface PromotionCampaign {
  agencyId: Types.ObjectId;
  creatorId: Types.ObjectId;
  userType: string;
  activityType: string;
  offerLimit: string;
  offerExpiry: string;
  message?: string;
  createdAt?: Date;
  updatedAt?: Date;
  isExpired: boolean;
}
