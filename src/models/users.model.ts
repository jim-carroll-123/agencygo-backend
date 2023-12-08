import { model, Schema, Document } from 'mongoose';
import { User } from '@interfaces/users.interface';

const UserSchema: Schema<User> = new Schema({
  isAdmin: {
    type: Boolean,
    default: false,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    default: '',
  },
  amount: {
    type: String,
  },
  status: {
    type: Boolean,
    default: true,
  },
  date: {
    tyoe: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  agencyPer: {
    type: String,
  },
  currentModelBalance: {
    type: Number,
  },
  isVerified: {
    type: Boolean,
    default: true,
  },
  agencyId: {
    type: Schema.Types.ObjectId,
    ref: 'agencies',
  },
  isAgency: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: false,
    validate: {
      validator: (value: string) => value.length > 0,
      message: 'Password field is required',
    },
  },
  isEmployee: {
    type: Boolean,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'employee', 'manager'],
  },
  twilioUserId: {
    type: String,
  },
});

export const UserModel = model<User & Document>('User', UserSchema);
