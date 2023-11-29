import { ObjectId } from 'mongoose';

export interface ContentHub {
  _id?: string;
  userId: ObjectId;
  timeStamp: Date;
  s3url: string;
}
