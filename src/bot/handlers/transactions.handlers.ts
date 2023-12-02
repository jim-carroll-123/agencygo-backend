import { EarningsService } from '@/services/earnings.service';
import { Job } from 'bullmq';
import Container from 'typedi';

export function updateTransactions(job: Job): Promise<void> {
  const earnings = Container.get(EarningsService);
  earnings.syncTranscations(job.data.creator, job.data.txs);
  return;
}
