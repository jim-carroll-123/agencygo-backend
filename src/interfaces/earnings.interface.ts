export interface EarningsDetails {
  subscriptions: number;
  post: number;
  messages: number;
  tips: number;
  referrals: number;
  streams: number;
  total: number;
  chart: {
    labels: string[];
    data: number[];
  };
}

export interface EarningsResponse {
  yesterday: EarningsDetails;
  today: EarningsDetails;
  thisWeek: EarningsDetails;
  thisMonth: EarningsDetails;
  thisYear: EarningsDetails;
}
