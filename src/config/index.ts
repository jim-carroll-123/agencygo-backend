import { config } from 'dotenv';
import path from 'path';
import fs from 'fs';

const envFilePath = path.join(__dirname, '../..', `.env.${process.env.NODE_ENV || 'development'}.local`);
console.log(envFilePath);
if (fs.existsSync(envFilePath)) {
  config({ path: envFilePath });
} else {
  console.info('[Info] env file is missing! It will be used default .env, if exist.');
  config();
}

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const { NODE_ENV, PORT, SECRET_KEY, LOG_FORMAT, LOG_DIR, ORIGIN } = process.env;
export const { DBCONN_STR } = process.env;
export const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, BUCKET_PUBLIC, BUCKET_PRIVATE } = process.env;
export const { IPROYAL_API_KEY, PROXY_API_KEY, PROXY_URL } = process.env;
export const { SENDGRID_API_KEY, SENDER, URL } = process.env;
export const {
  TWILIO_ACCOUNT_SID,
  TWILIO_API_KEY,
  TWILIO_CHAT_SERVICE_SID,
  TWILIO_NOTIFICATION_SERVICE_SID,
  TWILIO_SYNC_SERVICE_SID,
  TWILIO_PHONE_NUMBER,
  TWILIO_SECRET_KEY,
  TWILIO_AUTH_TOKEN,
} = process.env;
