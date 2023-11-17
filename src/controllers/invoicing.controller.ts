import { Invoicing } from '@/interfaces/invoicing.interface';
import { InvoicingService } from '@/services/invoicing.service';
import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
const puppeteer = require('puppeteer');
import path from 'path';
import fs from 'fs';
import { UserModel } from '@/models/users.model';
import mongoose from 'mongoose';
import { UpdateInvoicingDto } from '@/dtos/invoicing.dto';


export class InvoicingController {

  private readonly invoicingService: InvoicingService;

  constructor() {
      this.invoicingService = new InvoicingService();
  }
  public invoicing = Container.get(InvoicingService);

  public createInvoicing = async (req: Request, res: Response, next: NextFunction) => {
      try {
          const invoicingData: Invoicing = req.body;
          const userId = req.params.id;
          const createInvoicingData: Invoicing = await this.invoicingService.createInvoicing(invoicingData);

          res.status(201).json({ data: createInvoicingData, message: 'Invoicing created Successfully' });
      } catch (error) {
          next(error);
      }
  };

  public create = async (req: Request, res: Response, next: NextFunction) => {
      try {
          const invoicingData: Invoicing = req.body;
          const templateName: string = req.query.templateName as string || 'template1'; 
          const preparedHTML = await this.invoicingService.prepareInvoiceHTML(invoicingData, templateName);
  
          const pdfBuffer = await this.generatePDFFromHTML(preparedHTML);
  
          const currentDate = new Date();
          const formattedDate = currentDate.toISOString().replace(/[:.]/g, '-');
          const uniqueFilename = `invoice_${formattedDate}.pdf`;
          const pdfPath = path.join(process.cwd(), 'assets', 'pdf', uniqueFilename);
          fs.writeFileSync(pdfPath, pdfBuffer);
  
          const baseUrl = 'http://localhost:3000';
          const pdfUrl = `${baseUrl}/assets/pdf/${uniqueFilename}`;
  
          res.status(200).json({ data: pdfUrl, message: 'PDF created successfully' });
      } catch (error) {
          next(error);
      }
  }
  
  

  public getInvoicesByUserId = async (req: Request, res: Response, next: NextFunction) => {
      try {
          const userId = req.params.userId;
          const userInvoices: Invoicing[] = await this.invoicing.getInvoicesByUserId(userId);
          res.status(200).json({ data: userInvoices, message: 'Invoices retrieved successfully' });
      } catch (error) {
          next(error);
      }
  };


  public getInvoicing = async (req: Request, res: Response, next: NextFunction) => {
      try {
          const findAllUsersInvoicing: Invoicing[] = await this.invoicing.getAllInvoicing();
          res.status(200).json({ data: findAllUsersInvoicing, message: 'success' });
      } catch (error) {
          next(error);
      }
  };

  public getsingleInvoicing = async (req: Request, res: Response, next: NextFunction) => {
      try {
          const InvoicingId = req.params.id;
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
      const InvoicingData: Invoicing = req.body; // Ensure that this matches the Invoicing interface
      const updatedInvoicing = await this.invoicingService.updateInvoicing(InvoicingId, InvoicingData);
      res.status(200).json({ data: updatedInvoicing, message: 'Invoicing updated successfully' });
    } catch (error) {
      next(error);
    }
  };

  private async generatePDFFromHTML(html: string): Promise<Buffer> {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(html);
    const pdfBuffer = await page.pdf();
    await browser.close();
    return pdfBuffer;
  }
}
