import { model, Schema, Document } from 'mongoose';
import { Attendance } from '@/interfaces/attendance.interface';

const AttendanceSchema: Schema<Attendance> = new Schema({
  employeeId: {
    type: Schema.Types.ObjectId,
    ref: 'employee',
  },
  startDateTime: {
    type: Schema.Types.Date,
  },
  endDateTime: {
    type: Schema.Types.Date,
  },
  breakTime: {
    type: Schema.Types.Mixed,
  },
  notes: {
    type: Schema.Types.String,
  },
  totalHours: {
    type: Schema.Types.String,
  },
  breakHours: {
    type: Schema.Types.String,
  },
  timeLine: {
    type: Schema.Types.Mixed,
  },
});
export const AttendanceModal = model<Attendance & Document>('Attendance', AttendanceSchema);
