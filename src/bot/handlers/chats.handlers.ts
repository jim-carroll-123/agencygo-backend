import { Job } from 'bullmq';

export function updateChats(job: Job): Promise<void> {
  console.log(job);
  return;
}

export function updateMessages(job: Job): Promise<void> {
  console.log(job);
  return;
}
