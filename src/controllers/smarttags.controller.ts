import { smartTags } from "@/interfaces/smarttags.interface";
import { SmartTagsService } from "@/services/smarttags.services";
import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { uploadToS3 } from '@/utils/fileUpload';
import path from 'path';
import PDFDocument from 'pdfkit';
import { Readable } from 'stream';
import fs from 'fs';

export class SmartTagsController {

    private readonly smartTagsService: SmartTagsService;

  constructor() {
    this.smartTagsService = new SmartTagsService();
  }
    public smartTags = Container.get(SmartTagsService);

    public createSmartTags = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const smartTagsData: smartTags = req.body;
            const userId = req.params.id;
            const createSmartTagsData: smartTags = await this.smartTags.createSmartTags(smartTagsData);

            res.status(201).json({ data: createSmartTagsData, message: 'SmartTags created Successfully' });
        } catch (error) {
            next(error);
        }
    };

}