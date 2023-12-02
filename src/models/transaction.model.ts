import { Schema, model, Document } from 'mongoose';
import { Transaction, TransactionOrigin } from '@/interfaces/transaction.interface';

const TransactionSchema: Schema<Transaction> = new Schema({
  creatorId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  agencyId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  type: {
    type: Schema.Types.Number,
    enum: Object.values(TransactionOrigin),
    required: true,
  },
  amount: {
    type: Schema.Types.Number,
    required: true,
  },
  vatAmount: {
    type: Schema.Types.Number,
    required: true,
  },
  net: {
    type: Schema.Types.Number,
    required: true,
  },
  fee: {
    type: Schema.Types.Number,
    required: true,
  },
  createdAt: {
    type: Schema.Types.Date,
    required: true,
  },
  currency: {
    type: Schema.Types.String,
    required: true,
  },
  description: {
    type: Schema.Types.String,
  },
  status: {
    type: Schema.Types.String,
    required: true,
  },
  card: {
    last4: {
      type: Schema.Types.String,
      required: true,
    },
    brand: Schema.Types.String,
  },
  ofId: {
    type: Schema.Types.String,
  },
});

export const TransactionModel = model<Transaction & Document>('transactions', TransactionSchema);
