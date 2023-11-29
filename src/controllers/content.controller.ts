import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { ContentHubServices } from '@/services/content.service';
import { ContentHub } from '@/interfaces/content.interface';
import { uploadToS3 } from '@/utils/fileUpload';
import path from 'path';

export class ContentController {
  public content = Container.get(ContentHubServices);
  public uploadContentToS3 = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const contentData: ContentHub = req.body;
      if (req.file) {
        const originalnameWithoutSpaces = req.file.originalname.replace(/\s/g, '');
        const result = await uploadToS3(req.file.buffer, originalnameWithoutSpaces + Date.now() + path.extname(req.file.originalname));
        contentData.s3url = result.Location;
      }
      const data: { success: boolean; data: ContentHub } = await this.content.uploadContentToS3(contentData, req.user);

      res.status(200).json({ ack: 1, message: 'Content Uploaded Successfully', data: data });
    } catch (error) {
      next(error);
    }
  };
}
