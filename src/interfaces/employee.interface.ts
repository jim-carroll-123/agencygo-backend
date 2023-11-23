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
  password: string;
  payRate: Number;
  payInterval: String;
  commission: Number;
  shiftSchedular: String;
}

export interface EmployeeCreate {
  name: string;
  email: string;
  role: Role;
  creator: Types.ObjectId;
  assignCreator: Types.ObjectId[] | Types.ObjectId;
  payRate: Number;
  payInterval: Number;
  commission: Number;
  shiftSchedular: string;
}

export interface EmployeeUpdate {
  name: string;
  email: string;
  role: Role;
  agencyId: Types.ObjectId;
  password: string;
  status: Status;
  creator: string[];
  assignCreator: string[] | string;
}
