import mongoose from 'mongoose';

export enum Gender {
  Male = 'male',
  Female = 'female',
}
export interface Creator {
  creatorImage: string;
  creatorName: string;
  gender: Gender;
  internalNotes: string;
  assignEmployee: mongoose.Types.ObjectId | null;
  autoRelink: boolean;
  proxy: object | null;
  sessionBucket: object | null;
  status: boolean;
  ofcreds: {
    email: string | null;
    password: string | null;
  };
}
