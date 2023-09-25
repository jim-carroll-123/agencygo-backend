import { BUCKET_PRIVATE, BUCKET_PUBLIC } from '@/config';
import { s3 } from '@/config/aws';
import { HttpException } from '@/exceptions/httpException';
import { Service } from 'typedi';
import { ManagedUpload } from 'aws-sdk/clients/s3';
import { S3 } from 'aws-sdk';

@Service()
export class StorageService {
  public async uploadFile(file: Buffer | Blob, filename: string, isPrivate?: boolean) {
    try {
      const result: ManagedUpload.SendData = await new Promise((resolve, reject) => {
        s3.upload(
          {
            Bucket: isPrivate ? BUCKET_PRIVATE : BUCKET_PUBLIC,
            Key: filename,
            Body: file,
          },
          {},
          (err, data) => {
            if (err) {
              reject(err);
            }
            resolve(data);
          },
        );
      });
      return result;
    } catch (error) {
      if (error.name === 'ValidationError') {
        throw new HttpException(400, error.message);
      }
      throw new HttpException(500, 'Internal Server Error');
    }
  }

  public async getFile(key: string, bucket: string) {
    try {
      const result: S3.GetObjectOutput = await new Promise((resolve, reject) => {
        s3.getObject(
          {
            Bucket: bucket,
            Key: key,
          },
          (err, data) => {
            if (err) {
              reject(err);
            }
            resolve(data);
          },
        );
      });
      return result;
    } catch (error) {
      if (error.name === 'ValidationError') {
        throw new HttpException(400, error.message);
      }
      throw new HttpException(500, 'Internal Server Error');
    }
  }

  public async deleteFile(key: string, bucket: string) {
    try {
      const result: S3.DeleteObjectOutput = await new Promise((resolve, reject) => {
        s3.deleteObject(
          {
            Bucket: bucket,
            Key: key,
          },
          (err, data) => {
            if (err) {
              reject(err);
            }
            resolve(data);
          },
        );
      });
      return result;
    } catch (error) {
      if (error.name === 'ValidationError') {
        throw new HttpException(400, error.message);
      }
      throw new HttpException(500, 'Internal Server Error');
    }
  }
}
