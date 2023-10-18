import { Types } from 'mongoose';

export interface Shifts {
  _id?: string;
  employeeId: string;
  creatorId: string;
  startTime: string;
  endTime: string;
  startDate: string;
  endDate: string;
  frequency: string;
  repeat: string[];
  status: boolean;
}
