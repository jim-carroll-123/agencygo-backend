import { Schema, model, Document } from 'mongoose';
import { Invoicing } from '@/interfaces/invoicing.interface';

const InvoicingSchema: Schema<Invoicing> = new Schema({

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
      description: {
        type: String,
        required: true,
      },
})
export const InvoicingModel = model<Invoicing & Document>('Invoicing', InvoicingSchema);
