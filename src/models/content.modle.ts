import { model, Schema, Document } from 'mongoose';
import { ContentHub } from '@/interfaces/content.interface';

const ContentHubSchema: Schema<ContentHub> = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  timeStamp: {
    type: Schema.Types.Date,
  },
  s3url: {
    type: Schema.Types.String,
  },
});
export const ContentHubModel = model<ContentHub & Document>('ContentHub', ContentHubSchema);
