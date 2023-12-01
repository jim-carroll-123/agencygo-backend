import { ObjectId } from 'mongoose';

export interface ContentHub {
  _id?: string;
  userId: ObjectId;
  createorId: ObjectId;
  timeStamp: Date;
  s3url: string;
  signedUrl: string;
  fileName: string;
  mimeType: string;
  imageKey: string;
  presignUrl: string;
  s3Key: string;
  bucketName: string;
  folderId: string;
  folderName: string;
  creatorEmail: string;
}
