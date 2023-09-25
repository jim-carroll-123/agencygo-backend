import mongoose from 'mongoose';

export enum Gender {
  Male = 'male',
  Female = 'female',
}
export interface Creator {
  _id?: mongoose.Types.ObjectId;
  creatorName: string;
  gender: Gender;
  internalNotes: string;
  assignEmployee: mongoose.Types.ObjectId | null; // The employee assigned to this creator
  autoRelink: boolean;
  proxy: mongoose.Types.ObjectId | null;
}
