import { Types } from 'mongoose';

export interface PromotionCampaign {
  agencyId: Types.ObjectId;
  creatorId: Types.ObjectId;
  userType: 'New' | 'Expired' | 'Both';
  activityType: 'Free trial' | 'First-month discount';
  offerLimit: 'No Limit' | number;
  offerExpiry: 'No Expiry' | number;
  message?: string | number | readonly string[] | undefined;
  createdAt?: Date;
  updatedAt?: Date;
  isExpired: boolean;
}
