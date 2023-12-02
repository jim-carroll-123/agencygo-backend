import { Router } from 'express';
import { InvoicingController } from '@/controllers/invoicing.controller';
import { CreateInvoicingDto, UpdateInvoicingDto } from '@/dtos/invoicing.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';

export class InvoicingRoute implements Routes {
  public path = '/invoicing';
  public router = Router();
  public invoicing = new InvoicingController();

  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.get(`${this.path}`, this.invoicing.getInvoicing);
    this.router.get(`${this.path}/:id`, this.invoicing.getsingleInvoicing);
    this.router.post(`${this.path}`, ValidationMiddleware(CreateInvoicingDto), this.invoicing.createInvoicing);
    this.router.delete(`${this.path}/:id`, this.invoicing.deleteInvoicing);
    this.router.put(`${this.path}/:id`, ValidationMiddleware(CreateInvoicingDto, true), this.invoicing.updateInvoicing);
    this.router.get(`${this.path}/user/:userId/invoices`, this.invoicing.getInvoicesByUserId);
    this.router.post(`${this.path}/create`, (req, res, next) => this.invoicing.create(req, res, next));
    this.router.get(`${this.path}/generate-pdf/:id`, this.invoicing.create);
    this.router.put(`${this.path}/:id`, ValidationMiddleware(UpdateInvoicingDto, true), this.invoicing.updateInvoicing);
  }
}
