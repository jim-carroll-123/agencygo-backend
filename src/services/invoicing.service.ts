import { Invoicing } from '@/interfaces/invoicing.interface';
import { Service } from 'typedi';
import { HttpException } from '@/exceptions/httpException';
import { InvoicingModel } from '@/models/invoicing.model';
import * as fs from 'fs';
import * as path from 'path';
const puppeteer = require('puppeteer');

@Service()
export class InvoicingService {
  public async createInvoicing(invoicingData: Invoicing): Promise<Invoicing> {
    try {
      const invoiceNumber = this.generateInvoiceNumber();
  
      const newInvoicingData: Invoicing = {
        ...invoicingData,
        invoiceNo: invoiceNumber,
      };
  
      const newInvoicing = new InvoicingModel(newInvoicingData);
      const createdInvoicing = await newInvoicing.save();
  
      return createdInvoicing;
    } catch (error) {
      throw error;
    }
  }

  public async getInvoicesByUserId(userId: string): Promise<Invoicing[]> {
    try {
      const userInvoices: Invoicing[] = await InvoicingModel.find({ userId });
      return userInvoices;
    } catch (error) {
      throw error;
    }
  }

  public async getAllInvoicing(): Promise<Invoicing[]> {
    const invoicings: Invoicing[] = await InvoicingModel.find();
    return invoicings;
  }

  public async getsingleInvoicing(invoicingId: string): Promise<Invoicing> {
    try {
      const getInvoicing: Invoicing = await InvoicingModel.findOne({ _id: invoicingId });
      return getInvoicing;
    } catch (error) {
      throw error;
    }
  }


  public async deleteInvoicing(invoicingId: string): Promise<Invoicing> {
    try {
      const deletedInvoicing = await InvoicingModel.findByIdAndDelete(invoicingId);
      if (!deletedInvoicing) throw new HttpException(404, "Invoicing doesn't exist");
      return deletedInvoicing;
    } catch (error) {
      throw error;
    }
  }

  public async updateInvoicing(id: string, data: Invoicing): Promise<Invoicing> {
    try {
      const updatedInvoicing = await InvoicingModel.findByIdAndUpdate(
        {
          _id: id,
        },
        data,
        {
          new: true,
        },
      );
      if (!updatedInvoicing) throw new HttpException(404, "Invoicing doesn't exist");
      return updatedInvoicing;
    } catch (error) {
      throw error;
    }
  }

  public async prepareInvoiceHTML(invoicingData: Invoicing, templateName = 'template1'): Promise<string> {
    try {
      const invoiceNumber = this.generateInvoiceNumber();
      const templatePath = path.join(__dirname, '..', 'pdftemplate', `${templateName}.html`);

      const html = fs.readFileSync(templatePath, 'utf8');
      const preparedHTML = html
        .replace('${userName}', invoicingData.userName)
        .replace('${companyName}', invoicingData.companyName)
        .replace('${companyAddress}', invoicingData.companyAddress)
        .replace('${companyContact}', invoicingData.companyContact)
        .replace('${userId}', invoicingData.userId.toString())
        .replace('${employeeId}', invoicingData.employeeId.toString())
        .replace('${amount}', invoicingData.amount.toString())
        .replace('${status}', invoicingData.status.toString())
        .replace('${date}', invoicingData.date.toString())
        .replace('${address}', invoicingData.address)
        .replace('${addresss}', invoicingData.addresss)
        .replace('${contactDetails}', invoicingData.contactDetails)
        .replace('${invoiceNo}', invoiceNumber)
        .replace('${paymentTerms}', invoicingData.paymentTerms)
        .replace('${contactName}', invoicingData.contactName)
        .replace('${nameDept}', invoicingData.nameDept)
        .replace('${clientCompanyName}', invoicingData.clientCompanyName)
        .replace('${addressShipTo}', invoicingData.addressShipTo)
        .replace('${phone}', invoicingData.phone)
        .replace('${email}', invoicingData.email)
        .replace('${description}', invoicingData.description)
        .replace('${invoiceTitle}', invoicingData.invoiceTitle)
        .replace('${qty}', invoicingData.qty.toString())
        .replace('${unitPrice}', invoicingData.unitPrice.toString())
        .replace('${total}', invoicingData.total.toString())
        .replace('${paymentInstructions}', invoicingData.paymentInstructions)
        .replace('${subtotal}', invoicingData.subtotal.toString())
        .replace('${discount}', invoicingData.discount.toString())
        .replace('${subtotalLessDiscount}', invoicingData.subtotalLessDiscount.toString())
        .replace('${taxRate}', invoicingData.taxRate)
        .replace('${totalTax}', invoicingData.totalTax.toString())
        .replace('${shippingHandling}', invoicingData.shippingHandling.toString())
        .replace('${balanceDue}', invoicingData.balanceDue)
        .replace('${addressShipTo}', invoicingData.addressShipTo)
        .replace('${phoneShipTo}', invoicingData.phoneShipTo);

      return preparedHTML.replace('${invoiceNo}', invoiceNumber);;
    } catch (error) {
      throw error;
    }
  }

  private generateInvoiceNumber(): string {
    const length = 8;
    const characters = '0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
  }


  public async updatePdfUrl(invoicingId: string, pdfUrl: string): Promise<Invoicing> {
    try {
      const updatedInvoicing = await InvoicingModel.findByIdAndUpdate(
        {
          _id: invoicingId,
        },
        { pdfUrl },
        {
          new: true,
        },
      );
      if (!updatedInvoicing) throw new HttpException(404, "Invoicing doesn't exist");
      return updatedInvoicing;
    } catch (error) {
      throw error;
    }
  }
}
