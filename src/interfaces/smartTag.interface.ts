import { Types } from 'mongoose';
export interface SmartTag {
  tierId: Types.ObjectId;
  creatorId: Types.ObjectId;
  agencyId: Types.ObjectId;
  minimumAmount: number;
  maximumAmount: number;
}
