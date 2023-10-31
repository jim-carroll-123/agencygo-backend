import { Schema, model, Document } from 'mongoose';
import { smartTags } from '@/interfaces/smarttags.interface';

const smartTagsSchema: Schema<smartTags> = new Schema({

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
    }
})
export const smartTagsModel = model<smartTags & Document>('smartTags', smartTagsSchema);
