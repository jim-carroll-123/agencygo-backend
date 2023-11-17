import { Types } from 'mongoose';

enum Role {
  CHATTER = 'chatter',
  ADMIN = 'admin',
  Manager = 'manager',
}

export interface User {
  _id?: string;
  role: Role;
  agencyId: Types.ObjectId;
  isAdmin: boolean;
  firstName: string;
  lastName: string;
  amount: string;
  status: boolean;
  agencyPer:string;
  date: Date;
  currentModalBalance:number;
  email: string;
  isVerified: boolean;
  isAgency: boolean;
  isEmployee: boolean;
  password: string;
  twilioUserId: string;
}
