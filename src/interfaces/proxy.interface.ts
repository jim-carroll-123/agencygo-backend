import { Types } from 'mongoose';

export interface IProxy {
  proxy_id: string;
  creator: Types.ObjectId | string;
  proxyAddress: string;
  port: number;
  valid: boolean;
  username: string;
  password: string;
  country?: string;
  city?: string;
  createdAt?: string;
}
