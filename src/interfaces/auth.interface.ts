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
  agencyMediaSocial: string;
  agencyName: string;
  agencyWebsite: string;
  email: string;
  numberOfCreators: number;
  password: string;
  agencyLogo: string;
}
