import { HttpException } from '@/exceptions/httpException';
import { ContentHub } from '@/interfaces/content.interface';
import { ContentHubModel } from '@/models/content.model';
import { Service } from 'typedi';
import { Email } from '@/interfaces/common.interface';
import { Emails } from '@/utils/email';
import mongoose from 'mongoose';
import { uploadSuccessTemplate } from '@/template/uploadSuccess';
import moment from 'moment';
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { AWS_ACCESS_KEY_ID, AWS_REGION, AWS_SECRET_ACCESS_KEY } from '@/config';

@Service()
export class ContentHubServices {
  public async uploadContentToS3(contentData: ContentHub, user) {
    try {
      const createContent: ContentHub = await ContentHubModel.create({
        userId: user._id,
        timeStamp: new Date(),
        s3url: contentData.s3url,
        signedUrl: contentData.signedUrl,
        fileName: contentData.fileName,
        folderId: contentData.folderId,
        mimeType: contentData.mimeType,
        createorId: contentData.createorId,
        imageKey: contentData.imageKey,
        presignUrl: contentData.presignUrl,
        bucketName: contentData.bucketName,
        folderName: contentData.folderName,
      });
      if (!createContent) {
        throw new HttpException(409, 'Content not uploaded');
      } else {
        console.log('contentData', contentData);
        //  Send email when uploaded successfully
        const staticEmail = contentData.creatorEmail;
        const template = uploadSuccessTemplate(staticEmail, user._id);
        const emailData: Email = {
          to: staticEmail,
          subject: 'Upload Successfull',
          template: template,
        };
        const response = await new Emails().sendEmail(emailData);
      }
      return { success: true, data: createContent };
    } catch (error) {
      if (error.name === 'ValidationError') {
        throw new HttpException(400, error.message);
      }
      throw new HttpException(500, 'Internal Server Error');
    }
  }

  public async getImageListBycreatorAndFolder(params, user) {
    const { createorId, folderName } = params;
    try {
      const expiredUrlList: ContentHub = await ContentHubModel.find({
        createorId: new mongoose.Types.ObjectId(createorId),
        folderName: folderName,
        timeStamp: {
          $lte: moment().subtract(6, 'days').format('YYYY-MM-DD HH:mm:ss'),
        },
      });

      if (expiredUrlList.length > 0) {
        const s3Client = new S3Client({
          region: AWS_REGION,
          credentials: {
            secretAccessKey: AWS_SECRET_ACCESS_KEY,
            accessKeyId: AWS_ACCESS_KEY_ID,
          },
        });
        for (let index = 0; index < expiredUrlList.length; index++) {
          const element = expiredUrlList[index];
          const expiresInSeconds = 7 * 24 * 60 * 60; // 7 days is the max

          const s3Params = {
            Bucket: element.bucketName,
            Key: element.imageKey,
          };
          const command = new GetObjectCommand(s3Params);

          const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: expiresInSeconds });
          console.log('Regen Url', signedUrl);

          await ContentHubModel.findOneAndUpdate(
            { imageKey: element.imageKey },
            {
              $set: {
                presignUrl: signedUrl,
              },
            },
            { new: true },
          );
        }
      }

      const createContent: ContentHub = await ContentHubModel.find({
        createorId: new mongoose.Types.ObjectId(createorId),
        folderName: folderName,
      });

      return { success: true, data: createContent };
    } catch (error) {
      if (error.name === 'ValidationError') {
        throw new HttpException(400, error.message);
      }
      console.log('error.message', error);
      throw new HttpException(500, 'Internal Server Error');
    }
  }

  public async deleteContent(body, user) {
    try {
      let condition = {};
      if (body.type === 'folder') {
        condition = { folderName: body.folderName };
      } else {
        condition = { imageKey: { $in: body.keyList } };
      }
      const createContent = await ContentHubModel.deleteMany(condition);
      return { success: true, data: createContent };
    } catch (error) {
      throw new HttpException(500, 'Internal Server Error');
    }
  }

  public async updatePresignedUrl(body) {
    try {
      const contentData = await ContentHubModel.findOneAndUpdate(
        { imageKey: body.imageKey },
        {
          $set: {
            presignUrl: body.presignUrl,
          },
        },
        { new: true },
      );
      return { success: true, data: contentData };
    } catch (error) {
      throw new HttpException(500, 'Internal Server Error');
    }
  }
}
