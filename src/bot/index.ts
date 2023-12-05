import { Job, Queue, Worker } from 'bullmq';
import { updateChats, updateMessages } from './handlers/chats.handlers';
import { updateTransactions } from './handlers/transactions.handlers';
import { Service } from 'typedi';
import IORedis from 'ioredis';

@Service()
export class BotManager {
  connection: IORedis;
  worker: Worker;
  manager: Queue;

  constructor() {
    this.worker = new Worker(`{onlyfans-digest}`, this.processJob, {
      connection: {
        host: process.env.DRAGONFLY_HOST,
        port: parseInt(process.env.DRAGONFLY_PORT),
      },
    });
    // This is a shared connection to dispatch bot requested with.
    this.connection = new IORedis({
      host: process.env.DRAGONFLY_HOST,
      port: parseInt(process.env.DRAGONFLY_PORT),
    });
    this.manager = new Queue('{onlyfans-manager}', {
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
      case 'bot-status':
        break;
    }
    return { success: true };
  }

  async assignWorker(creatorId: string, email: string, password: string, proxy: string) {
    this.manager.add('spawn', {
      creatorId,
      email,
      password,
      proxy,
    });
  }

  async getLatestTransactions(creatorId: string) {
    const queue = new Queue(`{onlyfans-actions-${creatorId}}`, { connection: this.connection });
    queue.add('check-statements', {});
  }
}
