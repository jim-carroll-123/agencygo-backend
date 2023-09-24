import mongoose from 'mongoose';

export enum SessionType {
  Client = 'client',
  Server = 'server',
}

export enum SessionStatus {
  Active = 'active',
  Inactive = 'inactive',
}

export interface Session {
  _id?: mongoose.Types.ObjectId;
  url?: string;
  key?: string;
  bucket?: string;
  creatorId: mongoose.Types.ObjectId;
  type: SessionType;
  status: SessionStatus;
}
