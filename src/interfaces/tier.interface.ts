import { Types } from 'mongoose';
export interface Tier {
  agencyId: Types.ObjectId;
  creatorId: Types.ObjectId;
  name: string;
}
