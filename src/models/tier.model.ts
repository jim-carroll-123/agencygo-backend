import { Schema, model, Document } from 'mongoose';
import { Tier } from '@/interfaces/tier.interface';
const tierSchema: Schema<Tier> = new Schema({
  agencyId: {
    type: Schema.Types.ObjectId,
    ref: 'Agency',
    required: true,
  },
  creatorId: {
    type: Schema.Types.ObjectId,
    ref: 'Creator',
    //required: true,
  },
  name: {
    type: String,
    required: true,
  },
});
export const tierModel = model<Tier & Document>('tiers', tierSchema);
