import { Job } from 'bullmq';

export function updateTransactions(job: Job): Promise<void> {
  console.log(job);
  return;
}
