import { Types } from 'mongoose';
export interface SmartTag {
  tagId: Types.ObjectId;
  creatorId: Types.ObjectId;
  agencyId: Types.ObjectId;
  minimumAmount: number;
  maximumAmount: number;
}
