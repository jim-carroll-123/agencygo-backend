import { Twilio } from '@/interfaces/twilio.interface';
import { Schema, model, Document } from 'mongoose';
const twilioSchema: Schema<Twilio> = new Schema({
  email: {
    type: String,
  },
  userData: {
    sid: String,
    accountSid: String,
    chatServiceSid: String,
    roleSid: String,
    identity: String,
    friendlyName: String,
    url: String,
    links: {
      user_conversations: String,
    },
  },
  conversationData: {
    type: String,
  },
});

export const TwilioModel = model<Twilio & Document>('Twilio', twilioSchema);
