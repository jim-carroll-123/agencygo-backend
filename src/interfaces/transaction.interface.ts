import { ObjectId, Document } from 'mongoose';

export enum TransactionOrigin {
  Messages,
  Subscriptions,
  Tips,
  Streams,
  Posts,
  Referrals,
}
export interface OFUserCompact {
  view: string;
  id: number;
  name: string;
  username: string;
  isVerified: boolean;
  avatar: string;
  avatarThumb: string;
}

export interface OFTransaction {
  amount: number;
  vatAmount: number;
  net: number;
  fee: number;
  createdAt: string;
  currency: string;
  description?: string;
  status: string;
  user: OFUserCompact;
  card: {
    last4: string;
    brand: string;
  };
  id: string;
}

export interface Transaction extends Document {
  _id?: ObjectId;
  creatorId: ObjectId;
  agencyId: ObjectId;
  type: TransactionOrigin;
  amount: number;
  vatAmount: number;
  net: number;
  fee: number;
  createdAt: Date;
  description: string;
  status: string;
  currency: string;
  user: OFUserCompact;
  card: {
    last4: string;
    brand: string;
  };
  ofId: string;
}
