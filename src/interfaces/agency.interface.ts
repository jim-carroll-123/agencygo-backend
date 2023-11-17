import mongoose from 'mongoose';

export interface Agency {
  _id: string;
  userId: mongoose.Types.ObjectId;
  agencyName: string;
  numberOfCreators: number;
  websiteUrl: string;
  socialMediaLink: string;
  agencyLogo: string;
  primaryColor: string;
  secondaryColor: string;
  email: string;
  phone: string;
  groups: mongoose.Types.ObjectId | mongoose.Types.ObjectId[];
  isSubGroup: boolean;
}
