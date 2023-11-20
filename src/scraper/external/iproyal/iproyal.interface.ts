export type IPRoyalOrderStatus = 'unpaid' | 'in-progress' | 'confirmed' | 'refunded' | 'expired';

export interface IPRoyalProduct {
  id: number;
  name: string;
  plans: IPRoyalPlan[];
  locations: IPRoyalLocation[];
  questions: IPRoyalQuestion[];
  quantityDiscounts: IPRoyalQuantityDiscount[];
}

export interface IPRoyalPlan {
  id: number;
  name: string;
  price: string;
  minQuantity: number;
}

export interface IPRoyalLocation {
  id: number;
  name: string;
  out_of_stock: boolean;
}

export interface IPRoyalQuestion {
  id: number;
  question: string;
  is_required: boolean;
}

export interface IPRoyalQuantityDiscount {
  discountFrom: number;
  discountPrecent: string;
}

export interface IPRoyalOrderInput {
  productId: number;
  planId: number;
  locationId: number;
  quantity: number;
  discountCoupon?: string;
}

export interface IPRoyalOrder {
  id: number;
  productName: string;
  planName: string;
  orderDate?: string;
  expireDate?: string;
  productInfo?: string;
  location?: string;
  quantity?: number;
  price: string;
  status: IPRoyalOrderStatus;
}

export interface IPRoyalOrderCredentials {
  id: number;
  ip: string;
  username: string;
  password: string;
  credentials: string;
  order_id: string;
}
