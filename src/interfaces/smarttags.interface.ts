import { Types } from 'mongoose';

export interface SmartTag {
  id: any;
  _id?: string;
  userId: Types.ObjectId;
  employeeId: Types.ObjectId;
  amount: number;
  status: boolean;
  description: string;
  date: Date;
}
