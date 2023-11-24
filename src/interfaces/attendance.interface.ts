import { ObjectId, Types } from 'mongoose';

export interface Attendance {
  _id?: string;
  employeeId: ObjectId;
  startDateTime: Date;
  endDateTime: Date;
  breakTime: string[];
  notes: string[];
  totalHours: string;
  breakHours: string;
}
