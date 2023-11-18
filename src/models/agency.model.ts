import { Agency } from '@/interfaces/agency.interface';
import mongoose, { Schema, model, Document } from 'mongoose';

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
  primaryColor: {
    type: String,
  },
  secondaryColor: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  groups: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
  },
  isSubGroup: {
    type: Boolean,
  },
});

export const AgencyModel = model<Agency & Document>('Agency', AgencySchema);
