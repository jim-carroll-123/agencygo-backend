import { Creator, Gender } from '@/interfaces/creator.interface';
import { Schema, model, Document } from 'mongoose';

const CreatorSchema: Schema<Creator> = new Schema({
  creatorImage: {
    type: String,
  },
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
  assignEmployee: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Employee',
    },
  ],
  autoRelink: {
    type: Boolean,
    default: false,
  },
  proxy: {
    type: Object,
    default: null,
  },
  sessionBucket: {
    type: Object,
    default: null,
  },
  status: {
    type: Boolean,
    default: true,
  },
  plateform: {
    type: Boolean,
    default: false,
  },
});

export const CreatorModel = model<Creator & Document>('Creator', CreatorSchema);
