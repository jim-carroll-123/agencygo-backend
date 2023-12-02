import { model, Schema, Document } from 'mongoose';
import { TimeLine } from '@/interfaces/timeline.interface';

const TimeLineSchema: Schema<TimeLine> = new Schema({
  attendanceId: {
    type: Schema.Types.ObjectId,
    ref: 'Attendance',
  },
  employeeId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  startTime: {
    type: Schema.Types.Date,
  },
  endTime: {
    type: Schema.Types.Date,
  },
  type: {
    type: Schema.Types.String,
  },
  total: { type: Schema.Types.Number },
});
export const TimelineModel = model<TimeLine & Document>('TimeLine', TimeLineSchema);
