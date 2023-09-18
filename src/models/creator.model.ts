import { Creator, Gender } from '@/interfaces/creator.interface';
import { Schema, model, Document } from 'mongoose';

const CreatorSchema: Schema<Creator> = new Schema({
  creatorName: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: Object.values(Gender),
    required: true,
  },
  internalNotes: {
    type: String,
  },
  assignEmployee: {
    type: Schema.Types.ObjectId,
    ref: 'Employee',
    default: null,
  },
  autoRelink: {
    type: Boolean,
    default: false,
  },
  session: {
    url: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: ['active', 'expired'],
      required: false,
    },
  },
});

export const CreatorModel = model<Creator & Document>('Creator', CreatorSchema);
