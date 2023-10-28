import { Invoicing } from "@/interfaces/invoicing.interface";
import { InvoicingService } from "@/services/invoicing.service";
import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { uploadToS3 } from '@/utils/fileUpload';
import path from 'path';

export class InvoicingController {

    public invoicing = Container.get(InvoicingService);
    public createInvoicing = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const InvoicingData: Invoicing = req.body;
        const userId = req.params.id;
        const createInvoicingData: Invoicing = await this.invoicing.createInvoicing(InvoicingData, userId);
  
        res.status(201).json({ data: createInvoicingData, message: 'Invoicing created Successfully' });
      } catch (error) {
        next(error);
      }
    };

    
  // public getInvoicing = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const findAllUsersInvoicing: Invoicing[] = await this.invoicing.getAllInvoicing();
  //     res.status(200).json({ data: findAllUsersInvoicing, message: 'success' });
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  // public getsingleInvoicing = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const InvoicingId = req.params.InvoicingId;
  //     const findSignleInvoicing: Invoicing = await this.invoicing.getsingleInvoicing(InvoicingId);
  //     res.status(200).json({ data: findSignleInvoicing, message: 'success' });
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  // public updateInvoicing = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const InvoicingId = req.params.InvoicingId;
  //     const InvoicingData: Invoicing = req.body;
  //     if (req.file) {
  //       const originalnameWithoutSpaces = req.file.originalname.replace(/\s/g, '');
  //       const result = await uploadToS3(req.file.buffer, originalnameWithoutSpaces + Date.now() + path.extname(req.file.originalname));
  //     }
  //     const updatedInvoicing = await this.invoicing.updateInvoicing(InvoicingId, InvoicingData);
  //     res.status(200).json({ data: updatedInvoicing, message: 'Invoicing updated successfully' });
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  // public deleteInvoicing = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const InvoicingId = req.params.InvoicingId;
  //     const deleteInvoicingData: Invoicing = await this.invoicing.deleteInvoicing(InvoicingId);
  //     res.status(200).json({ data: deleteInvoicingData, message: 'deleted' });
  //   } catch (error) {
  //     next(error);
  //   }
  // };
}