import { Types } from 'mongoose';

export interface Invoicing {
  userId: Types.ObjectId;
  employeeId: Types.ObjectId;
  amount: number;
  status: boolean;
  description: string;
  date: Date;
}
