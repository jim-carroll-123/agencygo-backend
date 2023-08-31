import { Types } from 'mongoose';

enum Role {
  CHATTER = 'chatter',
  ADMIN = 'admin',
  LEADER = 'team leader',
}

export interface Employee {
  employeeName: string;
  employeeEmail: string;
  agencyId: Types.ObjectId;
  role: Role;
}
