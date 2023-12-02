import { Schema, model, Document } from 'mongoose';
import { Payroll } from '@/interfaces/payroll.interface';
import { CreatePayrollDto } from '@/dtos/payroll.dto';

const PayrollSchema: Schema<Payroll> = new Schema({
  employeeId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  hourlyPay: {
    type: String,
    required: true,
  },
  commissionEarned: {
    type: String,
    required: true,
  },
  bonus: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
  totalHours: {
    type: String,
    required: true,
  },
  totalPayment: {
    type: Number,
    required: true,
  },
});

export const PayrollModel = model<Payroll & Document>('Payroll', PayrollSchema);
