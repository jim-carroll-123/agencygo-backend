import { Creator, Gender } from '@/interfaces/creator.interface';
import { Schema, model, Document } from 'mongoose';

const CreatorSchema: Schema<Creator> = new Schema({
  agencyId: {
    type: Schema.Types.ObjectId,
    ref: 'Agency',
  },
  creatorImage: {
    type: String,
    default: null,
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
  isLinkOnlyFans: {
    type: Boolean,
    default: false,
  },
  ofcreds: {
    email: {
      type: String,
      default: null,
    },
    password: {
      type: String,
      default: null,
    },
  },
  agencyComission: {
    type: Number,
  },
  creatorComission: {
    type: Number,
  },
  modelData: {
    type: Object,
  },
});

export const CreatorModel = model<Creator & Document>('Creator', CreatorSchema);
