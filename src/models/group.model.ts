import { Group } from '@/interfaces/group.interface';
import mongoose, { Schema, model, Document } from 'mongoose';

const GroupSchema: Schema<Group> = new Schema({
  parentAgencyId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  name: {
    type: String,
  },
  isSubGroup: {
    type: Boolean,
    default: false,
  },
});

export const GroupModel = model<Group & Document>('Group', GroupSchema);
