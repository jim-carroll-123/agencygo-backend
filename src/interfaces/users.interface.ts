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
  email: string;
  isVerified: boolean;
  isAgency: boolean;
  isEmployee: boolean;
  password: string;
}
