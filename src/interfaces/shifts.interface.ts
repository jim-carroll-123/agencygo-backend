import { ObjectId, Types } from 'mongoose';

export interface Shifts {
  _id?: string;
  employeeId: ObjectId;
  creatorId: ObjectId;
  startTime: string;
  endTime: string;
  startDate: string;
  endDate: string;
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
