import { Types } from 'mongoose';

export interface Payroll {
  _id?: string;
  userId: Types.ObjectId;
  employeeId: Types.ObjectId;
  amount: number;
  status: boolean;
  description: string;
  hourlyPay?: string;
  commissionEarned?: string;
  bonus?: string;
  totalHours?: string;
  totalPayment?: number;
}
