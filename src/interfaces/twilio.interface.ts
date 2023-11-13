import mongoose from 'mongoose';

export interface Twilio {
  _id: string;
  email: string;
  userData: object;
  conversationData: object;
}
