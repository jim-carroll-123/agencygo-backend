import mongoose, { Document } from 'mongoose';

export enum Gender {
  Male = 'male',
  Female = 'female',
}
export interface Creator extends Document {
  _id?: mongoose.Types.ObjectId;
  creatorImage: string;
  creatorName: string;
  agencyId: mongoose.Types.ObjectId | null;
  gender: Gender;
  internalNotes: string;
  assignEmployee: mongoose.Types.ObjectId[] | null | string;
  autoRelink: string | boolean;
  proxy: object | null;
  sessionBucket: object | null;
  status: boolean | string;
  isLinkOnlyFans: boolean;
  ofcreds: {
    email: string;
    password: string;
  };
  agencyComission: Number;
  creatorComission: Number;
  modelData: Object;
}
export interface CreatorsResponse {
  creators: Creator[];
  totalDocument: number;
  hasNextPage: boolean;
}
