import { Types } from 'mongoose';

export enum InvoiceFrequency {
  Daily = 'Daily',
  Weekly = 'Weekly',
  Biweekly = 'Biweekly',
  Monthly = 'Monthly',
  Yearly = 'Yearly',
}
export interface Invoicing {
  _id: any;
  companyName: string;
  amount: number;
  description: string;
  employeeId: Types.ObjectId;
  status: boolean;
  userId: Types.ObjectId;
  phone: string;
  date: Date;
  recurringInvoice: boolean;
  recurringTimeline: boolean;
  autoEmailNotification: boolean;
  autoTextNotification: boolean;
  triggerWidthdrawal: boolean;
  frequency: InvoiceFrequency;
  userName: any;
  id: any;
  companyAddress: string;
  companyContact: string;
  delivery: Boolean;
  address: string;
  contactDetails: string;
  invoiceNo: string;
  paymentTerms: string;
  contactName: string;
  nameDept: string;
  clientCompanyName: string;
  addresss: string;
  email: string;
  qty: number;
  invoiceTitle: string;
  unitPrice: number;
  total: number;
  paymentInstructions: string;
  subtotal: number;
  discount: number;
  subtotalLessDiscount: number;
  taxRate: string;
  totalTax: number;
  shippingHandling: number;
  balanceDue: string;
  addressShipTo: string;
  pdfUrl?: string;
  phoneShipTo: string;
  createdAt?: Date;
  updatedAt?: Date;
}
