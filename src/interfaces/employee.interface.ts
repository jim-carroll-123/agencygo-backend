import { Types } from 'mongoose';

enum Role {
  CHATTER = 'chatter',
  ADMIN = 'admin',
  Manager = 'manager',
}

enum Status {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export interface Employee {
  name: string;
  email: string;
  agencyId: Types.ObjectId;
  role: Role;
  userId: Types.ObjectId;
  status: Status;
}

export interface EmployeeCreate {
  name: string;
  email: string;
  role: Role;
}

export interface EmployeeUpdate {
  name: string;
  email: string;
  role: Role;
  agencyId: Types.ObjectId;
}
