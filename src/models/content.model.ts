import { model, Schema, Document } from 'mongoose';
import { ContentHub } from '@/interfaces/content.interface';

const ContentHubSchema: Schema<ContentHub> = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createorId: {
    type: Schema.Types.ObjectId,
  },
  timeStamp: {
    type: Schema.Types.Date,
  },
  s3url: {
    type: Schema.Types.String,
  },
  signedUrl: {
    type: Schema.Types.String,
  },
  fileName: {
    type: Schema.Types.String,
  },
  mimeType: {
    type: Schema.Types.String,
  },
  imageKey: {
    type: Schema.Types.String,
  },
  presignUrl: {
    type: Schema.Types.String,
  },
  s3Key: {
    type: Schema.Types.String,
  },
  bucketName: {
    type: Schema.Types.String,
  },
  folderId: {
    type: Schema.Types.String,
  },
  folderName: {
    type: Schema.Types.String,
  },
});
export const ContentHubModel = model<ContentHub & Document>('ContentHub', ContentHubSchema);
