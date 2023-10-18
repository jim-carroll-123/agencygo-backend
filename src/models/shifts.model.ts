import { model, Schema, Document } from 'mongoose';
import { Shifts } from '@interfaces/shifts.interface';

const ShiftSchema: Schema<Shifts> = new Schema({
  employeeId: {
    type: String,
    ref: 'employee',
  },
  creatorId: {
    type: String,
    ref: 'Creator',
  },
  startTime: {
    type: String,
    default: '',
  },
  endTime: {
    type: String,
    default: '',
  },
  startDate: {
    type: String,
    default: '',
  },
  endDate: {
    type: String,
    default: '',
  },
  frequency: {
    type: String,
    default: '',
  },
  repeat: {
    type: [String],
    default: [],
  },
  status: {
    type: Boolean,
    default: true,
  },
});
export const ShiftModel = model<Shifts & Document>('Shift', ShiftSchema);
