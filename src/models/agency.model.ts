import { Agency } from '@/interfaces/agency.interface';
import { Schema, model, Document } from 'mongoose';

const AgencySchema: Schema<Agency> = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  agencyName: {
    type: String,
    required: true,
  },
  numberOfCreators: {
    type: Number,
    required: true,
  },
  websiteUrl: {
    type: String,
    required: true,
  },
  socialMediaLink: {
    type: String,
    required: true,
  },
  agencyLogo: {
    type: String,
  },
});

export const AgencyModel = model<Agency & Document>('Agency', AgencySchema);
