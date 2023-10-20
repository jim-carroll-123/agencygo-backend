import { config } from 'dotenv';
import { S3 } from './aws';
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const { NODE_ENV, PORT, SECRET_KEY, LOG_FORMAT, LOG_DIR, ORIGIN } = process.env;
export const { DBCONN_STR } = process.env;
export const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, BUCKET_PUBLIC, BUCKET_PRIVATE } = process.env;
export const { PROXY_API_KEY, PROXY_URL } = process.env;
export const { SENDGRID_API_KEY, SENDER, URL } = process.env;
export const s3 = S3;
