import { Schema, model } from 'mongoose';
import { IProxy } from '@interfaces/proxy.interface';

const ProxySchema: Schema<IProxy> = new Schema<IProxy>({
  proxy_id: {
    type: String,
    required: true,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'Creator',
  },
  proxyAddress: {
    type: String,
    required: true,
  },
  port: {
    type: Number,
    required: true,
  },
  valid: {
    type: Boolean,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  country: {
    type: String,
  },
  city: {
    type: String,
  },
  createdAt: {
    type: String,
  },
});

export const ProxyModel = model<IProxy>('Proxy', ProxySchema);
