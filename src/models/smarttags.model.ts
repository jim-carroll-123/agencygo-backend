import { Schema, model, Document } from 'mongoose';
import { SmartTag } from '@/interfaces/smarttags.interface';

const smartTagSchema: Schema<SmartTag> = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  employeeId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  //expired fan or not
  status: {
    type: Boolean,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});
export const smartTagModel = model<SmartTag & Document>('smartTags', smartTagSchema);
