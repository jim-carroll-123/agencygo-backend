import { HttpException } from '@/exceptions/httpException';
import { ContentHub } from '@/interfaces/content.interface';
import { ContentHubModel } from '@/models/content.modle';
import { Service } from 'typedi';

@Service()
export class ContentHubServices {
  public async uploadContentToS3(contentData: ContentHub, user) {
    try {
      const createContent: ContentHub = await ContentHubModel.create({
        userId: user._id,
        timeStamp: new Date(),
        s3url: contentData.s3url,
      });

      if (!createContent) {
        throw new HttpException(409, 'Content not uploaded');
      }
      return { success: true, data: createContent };
    } catch (error) {
      if (error.name === 'ValidationError') {
        throw new HttpException(400, error.message);
      }
      throw new HttpException(500, 'Internal Server Error');
    }
  }
}
