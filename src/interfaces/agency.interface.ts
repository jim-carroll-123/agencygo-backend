import mongoose from 'mongoose';

export interface Agency {
  userId: mongoose.Types.ObjectId;
  agencyName: string;
  numberOfCreators: number;
  websiteUrl: string;
  socialMediaLink: string;
}
