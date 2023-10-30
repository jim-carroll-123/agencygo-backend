import mongoose from 'mongoose';

export interface Agency {
  _id: string;
  userId: mongoose.Types.ObjectId;
  agencyName: string;
  numberOfCreators: number;
  websiteUrl: string;
  socialMediaLink: string;
  agencyLogo: string;
}
