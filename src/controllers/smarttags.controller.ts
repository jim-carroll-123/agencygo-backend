import { SmartTag } from '@/interfaces/smarttags.interface';
import { SmartTagsService } from '@/services/smarttags.services';
import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
// import { uploadToS3 } from '@/utils/fileUpload';
// import path from 'path';
// import PDFDocument from 'pdfkit';
// import { Readable } from 'stream';
// import fs from 'fs';

export class SmartTagController {
  private readonly smartTagsService: SmartTagsService;
  constructor() {
    this.smartTagsService = new SmartTagsService();
  }
  public smartTag = Container.get(SmartTagsService);

  public createSmartTag = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const smartTagsData: SmartTag = req.body;
      //const userId = req.params.id;
      const createSmartTagsData: SmartTag = await this.smartTag.createSmartTags(smartTagsData);

      res.status(201).json({ data: createSmartTagsData, message: 'SmartTags created Successfully' });
    } catch (error) {
      next(error);
    }
  };
  public getSmartTags = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const getAllSmartTags: SmartTag[] = await this.smartTag.getSmartTags();
      res.status(200).json({ data: getAllSmartTags, message: 'findAllSmartTags' });
    } catch (error) {
      next(error);
    }
  };

  public getSmartTagById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const smartTagId: string = req.params.id;
      const findOneSmartTagData: SmartTag = await this.smartTag.getSmartTagById(smartTagId);

      res.status(200).json({ data: findOneSmartTagData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };
  public updateSmartTag = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const smartTagId: string = req.params.id;
      const smartTagData: SmartTag = req.body;
      const updateSmartTagData: SmartTag = await this.smartTag.updateSmartTag(smartTagId, smartTagData);

      res.status(200).json({ data: updateSmartTagData, message: 'smart tag updated successfully' });
    } catch (error) {
      next(error);
    }
  };
  public deleteSmartTag = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const smartTagId: string = req.params.id;
      const deleteSmartTagData = await this.smartTag.deleteSmartTag(smartTagId);
      res.status(200).json({ data: deleteSmartTagData, message: 'smart tag deleted' });
    } catch (error) {
      next(error);
    }
  };
}
