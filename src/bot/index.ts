import { Job, Worker } from 'bullmq';
import { updateChats, updateMessages } from './handlers/chats.handlers';
import { updateTransactions } from './handlers/transactions.handlers';
import { Service } from 'typedi';

@Service()
export class BotManager {
  worker: Worker;

  constructor() {
    this.worker = new Worker(`{onlyfans-digest}`, this.processJob, {
      connection: {
        host: process.env.DRAGONFLY_HOST,
        port: parseInt(process.env.DRAGONFLY_PORT),
      },
    });
  }

  async processJob(job: Job) {
    switch (job.name) {
      case 'update-chats':
        await updateChats(job);
        break;
      case 'update-messages':
        await updateMessages(job);
        break;
      case 'update-transactions':
        await updateTransactions(job);
        break;
      case 'check-stats':
        break;
    }
    return { success: true };
  }
}
