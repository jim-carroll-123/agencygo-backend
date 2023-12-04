import { Employee } from '@/interfaces/employee.interface';
import { Schema, model, Document } from 'mongoose';

const EmployeeSchema: Schema<Employee> = new Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value);
      },
      message: 'Invalid email format',
    },
  },
  agencyId: {
    type: Schema.Types.ObjectId,
    ref: 'agencies',
    required: true,
  },
  role: {
    type: String,
    enum: ['employee', 'manager', 'admin'],
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  payRate: {
    type: Number,
  },
  payInterval: {
    type: String,
  },
  commission: {
    type: Number,
  },
  shiftSchedular: {
    type: String,
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
  },
});

export const EmployeeModel = model<Employee & Document>('employee', EmployeeSchema);
