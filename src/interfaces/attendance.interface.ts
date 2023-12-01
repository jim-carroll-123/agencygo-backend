import { ObjectId, Types } from 'mongoose';

interface TimeLine {
  startTime: Date;
  type: 'working' | 'break';
  endTime: Date | null;
}

export interface Attendance {
  _id?: string;
  employeeId: ObjectId;
  startDateTime: Date;
  endDateTime: Date;
  breakTime: string[];
  notes: string;
  totalHours: string;
  breakHours: string;
  timeLine: any;
  isClockedOut: boolean;
}
