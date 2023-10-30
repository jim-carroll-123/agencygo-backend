import { Invoicing } from "@/interfaces/invoicing.interface";
import { InvoicingService } from "@/services/invoicing.service";
import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
// import { uploadToS3 } from '@/utils/fileUpload';
import path from 'path';

export class InvoicingController {

    public invoicing = Container.get(InvoicingService);

    public createInvoicing = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const invoicingData: Invoicing = req.body;
            const userId = req.params.id;
            const createInvoicingData: Invoicing = await this.invoicing.createInvoicing(invoicingData);

            res.status(201).json({ data: createInvoicingData, message: 'Invoicing created Successfully' });
        } catch (error) {
            next(error);
        }
    };

    public getInvoicing = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
    
            const result = await this.invoicing.getAllInvoicing(page, limit);
    
            res.status(200).json({ data: result.data, total: result.total, message: 'success' });
        } catch (error) {
            next(error);
        }
    };
    
    public getsingleInvoicing = async (req: Request, res: Response, next: NextFunction) => {
      try {
          const InvoicingId = req.params.id; // Use "id" instead of "InvoicingId"
          const findSingleInvoicing: Invoicing = await this.invoicing.getsingleInvoicing(InvoicingId);
          res.status(200).json({ data: findSingleInvoicing, message: 'success' });
      } catch (error) {
          next(error);
      }
  };
  
  public deleteInvoicing = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const InvoicingId = req.params.id;
        const deletedInvoicing = await this.invoicing.deleteInvoicing(InvoicingId);
        res.status(200).json({ data: deletedInvoicing, message: 'Invoicing deleted successfully' });
    } catch (error) {
        next(error);
    }
};

public updateInvoicing = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const InvoicingId = req.params.id;
        const InvoicingData: Invoicing = req.body;
        const updatedInvoicing = await this.invoicing.updateInvoicing(InvoicingId, InvoicingData);
        res.status(200).json({ data: updatedInvoicing, message: 'Invoicing updated successfully' });
    } catch (error) {
        next(error);
    }
};


}