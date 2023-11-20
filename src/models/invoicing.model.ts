import { Schema, model, Document } from 'mongoose';
import { Invoicing } from '@/interfaces/invoicing.interface';

const InvoicingSchema: Schema<Invoicing> = new Schema({
    userName: {
        type: String,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    employeeId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
    },
    delivery:{
        type:Boolean,
        required:true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    contactDetails: {
        type: String,
        required: true,
    },
    invoiceNo: {
        type: String,
        required: true,
    },
    paymentTerms: {
        type: String,
        required: true,
    },
    contactName: {
        type: String,
        required: true,
    },
    nameDept: {
        type: String,
        required: true,
    },
    clientCompanyName: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    qty: {
        type: Number,
        required: true,
    },
    unitPrice: {
        type: Number,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    paymentInstructions: {
        type: String,
        required: true,
    },
    subtotal: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        required: true,
    },
    subtotalLessDiscount: {
        type: Number,
        required: true,
    },
    taxRate: {
        type: String,
        required: true,
    },
    totalTax: {
        type: Number,
        required: true,
    },
    shippingHandling: {
        type: Number,
        required: true,
    },
    balanceDue: {
        type: String,
        required: true,
    },
    addressShipTo: {
        type: String,
        required: true,
    },
    phoneShipTo: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now, 
        required: false,
    },
    updatedAt: {
        type: Date,
        default: Date.now, 
        required: false,
    },
});

export const InvoicingModel = model<Invoicing & Document>('Invoicing', InvoicingSchema);
