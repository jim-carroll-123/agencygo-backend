import { EarningsDetails, EarningsResponse } from '@/interfaces/earnings.interface';
import { OFTransaction, TransactionOrigin, Transaction } from '@/interfaces/transaction.interface';
import { CreatorModel } from '@/models/creator.model';
import { TransactionModel } from '@/models/transaction.model';
import moment from 'moment';
import { ObjectId } from 'mongoose';
import { Service } from 'typedi';

function getTransactionType(description: string): TransactionOrigin {
  if (description.startsWith('Subscription from') || description.startsWith('Recurring subscription from')) {
    return TransactionOrigin.Subscriptions;
  }
  if (description.startsWith('Tip from')) {
    return TransactionOrigin.Tips;
  }
  if (description.startsWith('Payment for message')) {
    return TransactionOrigin.Messages;
  }
  // Guessing at attributions from below.  Will need to refine in the future;
  if (description.includes('post')) {
    return TransactionOrigin.Posts;
  }
  if (description.includes('stream')) {
    return TransactionOrigin.Streams;
  }
  // Setting Referrals as a catch all.  Will need to be refined.
  return TransactionOrigin.Referrals;
}

function createChart(transaction: Transaction[]): { labels: string[]; data: number[] } {
  const groups: { [key: string]: number } = {};
  for (const tx of transaction) {
    const key = moment(tx.createdAt).format('D MMM');
    if (groups[key]) {
      groups[key] += tx.net;
    } else {
      groups[key] = tx.net;
    }
  }
  const labels = Object.keys(groups);
  const data = Object.values(groups);
  return { labels, data };
}

function getEarningsDetails(transactions: Transaction[], filter: (value: Transaction) => boolean): EarningsDetails {
  const filteredTxs = transactions.filter(filter);
  return {
    messages: filteredTxs.filter(tx => tx.type === TransactionOrigin.Messages).reduce((pv, cv) => pv + cv.net, 0),
    post: filteredTxs.filter(tx => tx.type === TransactionOrigin.Posts).reduce((pv, cv) => pv + cv.net, 0),
    referrals: filteredTxs.filter(tx => tx.type === TransactionOrigin.Referrals).reduce((pv, cv) => pv + cv.net, 0),
    streams: filteredTxs.filter(tx => tx.type === TransactionOrigin.Streams).reduce((pv, cv) => pv + cv.net, 0),
    subscriptions: filteredTxs.filter(tx => tx.type === TransactionOrigin.Subscriptions).reduce((pv, cv) => pv + cv.net, 0),
    tips: filteredTxs.filter(tx => tx.type === TransactionOrigin.Tips).reduce((pv, cv) => pv + cv.net, 0),
    total: filteredTxs.reduce((pv, cv) => pv + cv.net, 0),
    chart: createChart(filteredTxs),
  };
}

@Service()
export class EarningsService {
  public async syncTranscations(creatorId: ObjectId, txs: OFTransaction[]): Promise<void> {
    const creator = await CreatorModel.findOne({
      _id: creatorId,
    });
    const transformedTransactions = txs.map(tx => ({
      updateOne: {
        filter: {
          ofId: tx.id,
        },
        upsert: true,
        update: {
          ofId: tx.id,
          creatorId,
          currency: tx.currency,
          card: tx.card,
          user: tx.user,
          amount: tx.amount,
          vatAmount: tx.vatAmount,
          net: tx.net,
          fee: tx.fee,
          createdAt: new Date(tx.createdAt),
          description: tx.description,
          status: tx.status,
          type: getTransactionType(tx.description),
          agencyId: creator.agencyId,
        },
      },
    }));
    await TransactionModel.bulkWrite(transformedTransactions);
  }

  public async getEarnings(agencyId: string): Promise<EarningsResponse> {
    const transactions = await TransactionModel.find({
      agencyId,
    });
    return {
      yesterday: getEarningsDetails(transactions, tx => moment(tx.createdAt).isSame(moment().subtract({ day: 1 }), 'day')),
      today: getEarningsDetails(transactions, tx => moment(tx.createdAt).isSame(moment(), 'day')),
      thisWeek: getEarningsDetails(transactions, tx => moment(tx.createdAt).isSame(moment(), 'week')),
      thisMonth: getEarningsDetails(transactions, tx => moment(tx.createdAt).isSame(moment(), 'month')),
      thisYear: getEarningsDetails(transactions, tx => moment(tx.createdAt).isSame(moment(), 'year')),
    };
  }
}
