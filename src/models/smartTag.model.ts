import { Schema, model, Document } from 'mongoose';
import { SmartTag } from '@/interfaces/smartTag.interface';

const smartTagSchema: Schema<SmartTag> = new Schema({
  tagId: {
    type: Schema.Types.ObjectId,
    ref: 'Tag',
    required: true,
  },
  agencyId: {
    type: Schema.Types.ObjectId,
    ref: 'Agency',
    required: true,
  },
  creatorId: {
    type: Schema.Types.ObjectId,
    ref: 'Creator',
    required: true,
  },
  minimumAmount: {
    type: Number,
    required: true,
  },
  maximumAmount: {
    type: Number,
    required: true,
  },
});
export const smartTagModel = model<SmartTag & Document>('smartTags', smartTagSchema);
