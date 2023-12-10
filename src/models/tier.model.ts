import { Schema, model, Document } from 'mongoose';
import { Tier } from '@/interfaces/tier.interface';

const tierSchema: Schema<Tier> = new Schema({
  name: {
    type: String,
    required: true,
  },
});
export const tierModel = model<Tier & Document>('smartTags', tierSchema);
