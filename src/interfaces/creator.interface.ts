import mongoose from 'mongoose';

export enum Gender {
  Male = 'male',
  Female = 'female',
}

export enum SessionStatus {
  Active = 'active',
  Expired = 'expired',
}
export interface Creator {
  _id?: string;
  creatorName: string;
  gender: Gender;
  internalNotes: string;
  assignEmployee: mongoose.Types.ObjectId | null; // The employee assigned to this creator
  autoRelink: boolean;
  session?: {
    url: string;
    status: SessionStatus;
  };
}
