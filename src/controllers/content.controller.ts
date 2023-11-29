import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { ContentHubServices } from '@/services/content.service';
import { ContentHub } from '@/interfaces/content.interface';

export class ContentController {
  public content = Container.get(ContentHubServices);
  public uploadContentToS3 = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: { success: boolean; data: ContentHub } = await this.content.uploadContentToS3(req.body, req.user);
      res.status(200).json({ ack: 1, message: 'Content Uploaded Successfully', data: data });
    } catch (error) {
      next(error);
    }
  };

  public getImageListBycreatorAndFolder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: { success: boolean; data: ContentHub } = await this.content.getImageListBycreatorAndFolder(req.params, req.user);
      res.status(200).json({ ack: 1, message: 'Content Uploaded Successfully', data: data });
    } catch (error) {
      next(error);
    }
  };

  public deleteContent = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: { success: boolean; data: ContentHub } = await this.content.deleteContent(req.body, req.user);
      res.status(200).json({ ack: 1, message: 'Content Deleted Successfully', data: data });
    } catch (error) {
      next(error);
    }
  };
}
