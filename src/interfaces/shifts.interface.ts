import { ObjectId, Types } from 'mongoose';

export interface Shifts {
  _id?: string;
  employeeId: ObjectId;
  creatorId: ObjectId;
  startTime: Date;
  endTime: Date;
  startDate: Date;
  endDate: Date;
  frequency: string;
  repeat: {
    sunday: boolean;
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
  };
  status: boolean;
}
