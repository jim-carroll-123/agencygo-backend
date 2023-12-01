import { ObjectId } from 'mongoose';

export interface TimeLine {
  _id?: string;
  attendanceId: ObjectId;
  employeeId: ObjectId;
  startTime: Date;
  endTime: Date;
  type: string;
  total: number;
}
