import axios, { AxiosInstance } from 'axios';
import { IPROYAL_API_KEY } from '../../../config';
import { IPRoyalOrder, IPRoyalOrderCredentials, IPRoyalOrderInput, IPRoyalProduct } from './iproyal.interface';

export class IPRoyalClient {
  private apiKey: string = IPROYAL_API_KEY;
  private client: AxiosInstance;

  constructor(apikey?: string) {
    if (apikey) {
      this.apiKey = apikey;
    }
    this.client = axios.create({
      baseURL: 'https://dashboard.iproyal.com/api',
      headers: {
        'X-Access-Token': `Bearer ${this.apiKey}`,
      },
    });
  }

  async getAvailableProducts(): Promise<IPRoyalProduct[]> {
    const res = await this.client.get('/servers/proxies/reseller/products');
    return res.data as IPRoyalProduct[];
  }

  async calculateOrderPrice(order: IPRoyalOrderInput): Promise<number> {
    const res = await this.client.get('/servers/proxies/reseller/price', {
      data: order,
    });
    if (typeof res.data === 'string') {
      return parseFloat(res.data);
    }
    return res.data;
  }

  //   async createOrder(): Promise<unkown> {}
  //   async extendOrder(): Promise<unkown> {}

  async getOrders(): Promise<IPRoyalOrder[]> {
    const res = await this.client.get('/servers/proxies/reseller/orders');
    return res.data as IPRoyalOrder[];
  }

  async getOrder(id: number): Promise<IPRoyalOrder> {
    const res = await this.client.get(`/servers/proxies/reseller/${id}/order`);
    return res.data as IPRoyalOrder;
  }

  async getOrderCredentials(id: number): Promise<IPRoyalOrderCredentials[]> {
    const res = await this.client.get(`/servers/proxies/reseller/${id}/credentials`);
    return res.data.data as IPRoyalOrderCredentials[];
  }

  //   async changeOrderCredentials(): Promise<unknown> {}
}
