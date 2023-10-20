import { Request } from 'express';
import { User } from '@interfaces/users.interface';

export interface DataStoredInToken {
  _id: string;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface RequestWithUser extends Request {
  user: User;
}

export interface RequestSignUp {
  email: string;
  agencyName: string;
  numberOfCreators: number;
  agencyWebsite: string;
  agencyMediaSocial: string;
  password: string;
  agencyLogo: string;
}
