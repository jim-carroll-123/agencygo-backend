import { HttpException } from '@/exceptions/httpException';
import { ContentHub } from '@/interfaces/content.interface';
import { ContentHubModel } from '@/models/content.model';
import { Service } from 'typedi';
import { Email } from '@/interfaces/common.interface';
import { generateEmailTemplateForForgotPassword } from '@/template/forgotPassword';
import { Emails } from '@/utils/email';
import mongoose from 'mongoose';
import { uploadSuccessTemplate } from '@/template/uploadSuccess';

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
      const createContent: ContentHub = await ContentHubModel.aggregate([
        {
          $match: {
            createorId: new mongoose.Types.ObjectId(createorId),
            folderName: folderName,
          },
        },
      ]);

      return { success: true, data: createContent };
    } catch (error) {
      if (error.name === 'ValidationError') {
        throw new HttpException(400, error.message);
      }
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
}
