import mongoose from 'mongoose';

export enum Gender {
  Male = 'male',
  Female = 'female',
}
export interface Creator {
  _id?: mongoose.Types.ObjectId;
  creatorImage: string;
  creatorName: string;
  agencyId: mongoose.Types.ObjectId | null;
  gender: Gender;
  internalNotes: string;
  assignEmployee: mongoose.Types.ObjectId | null;
  autoRelink: boolean;
  proxy: object | null;
  sessionBucket: object | null;
  status: boolean;
  isLinkOnlyFans: boolean;
  ofcreds: {
    email: string;
    password: string;
  };
}
