import { Types } from 'mongoose';

enum Role {
  CHATTER = 'chatter',
  ADMIN = 'admin',
  Manager = 'manager',
}

export interface Employee {
  firstName: string;
  lastName: string;
  agencyId: Types.ObjectId;
  email: string;
  isEmployee: boolean;
  role: Role;
}
