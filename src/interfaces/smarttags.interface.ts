import { Types } from 'mongoose';


export interface smartTags {
    id: any;
    _id?: string;
    userId: Types.ObjectId;
    employeeId: Types.ObjectId;
    amount:number;
    status:boolean;
    description: string;
    date: Date;
  }