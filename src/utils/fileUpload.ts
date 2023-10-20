import * as AWS from 'aws-sdk';
import { BUCKET_PUBLIC } from '@config';
import { s3 } from '@config';

export const uploadToS3 = async (fileData: Buffer, fileName: string): Promise<any> => {
  let contentType = '';
  if (fileName.endsWith('.jpg') || fileName.endsWith('.jpeg')) {
    contentType = 'image/jpeg';
  } else if (fileName.endsWith('.png')) {
    contentType = 'image/png';
  } else if (fileName.endsWith('.gif')) {
    contentType = 'image/gif';
  } else if (fileName.endsWith('.mp4')) {
    contentType = 'video/mp4';
  } else if (fileName.endsWith('.avi')) {
    contentType = 'video/x-msvideo';
  }
  const params: AWS.S3.PutObjectRequest = {
    Bucket: BUCKET_PUBLIC,
    Key: fileName,
    Body: fileData,
    ContentType: contentType,
  };

  try {
    const result = await s3.upload(params).promise();
    return result;
  } catch (err) {
    console.log('here', err);
    throw err;
  }
};
