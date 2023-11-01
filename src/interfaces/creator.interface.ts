import mongoose from 'mongoose';

export enum Gender {
  Male = 'male',
  Female = 'female',
}
export interface Creator {
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
  plateform: boolean;
  ofcreds: {
    email: string;
    password: string;
  };
}
