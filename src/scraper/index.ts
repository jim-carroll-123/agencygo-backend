import { HTTPResponse, Page } from 'puppeteer';
import puppeteer from 'puppeteer-extra';
import Container, { Service } from 'typedi';
import { OFBalances, OFTransaction, OFTransactionsList } from './interfaces/onlyfans.interface';
// import { ILoginProps, LoginBotService } from './services/login.service';
// import { UserBotService } from './services/user.service';

@Service()
export class Scraper {
  // public serviceLogin = Container.get(LoginBotService);
  // public serviceUser = Container.get(UserBotService);
  private entryUrl = 'https://onlyfans.com';
  private page: Page;
  private notifications: unknown[];
  private conversations: unknown[];
  private identity: unknown;
  private balances: OFBalances;
  private transactions: OFTransaction[];

  constructor(url?: string) {
    if (url) {
      this.entryUrl = url;
    }
  }

  async openClient(userDataDir: string): Promise<void> {
    const browser = await puppeteer.launch({
      headless: false,
      userDataDir,
      args: ['--start-maximized', `--disable-extensions`],
    });
    this.page = await browser.newPage();
    this.page.on('response', this.handleResponse);
    await this.page.goto(this.entryUrl);
  }

  // async getAuth(id: string): Promise<unknown> {}
  // async login(id: string, username: string, password: string) {}
  // async logout(id: string) {}

  async checkMessages(): Promise<void> {
    await this.page.goto(`${this.entryUrl}/my/chats`);
  }

  async checkNotifications(): Promise<void> {
    await this.page.goto(`${this.entryUrl}/my/notifications`);
  }

  async checkFollowing(): Promise<void> {
    await this.page.goto(`${this.entryUrl}/my/collections/user-lists/subscriptions/expired?order_field=expire_date`);
  }

  async checkVault(): Promise<void> {
    await this.page.goto(`${this.entryUrl}/my/vault`);
  }

  async checkQueue(): Promise<void> {
    await this.page.goto(`${this.entryUrl}/my/queue`);
  }

  async checkEarnings(): Promise<void> {
    await this.page.goto(`${this.entryUrl}/my/statements/earnings`);
  }

  async handleResponse(res: HTTPResponse): Promise<void> {
    if (res.status() === 200) {
      const headers = res.headers();
      if (res.url().startsWith('https://onlyfans.com/api2/v2/') && headers['content-type'].startsWith('application/json')) {
        if (res.url().startsWith('https://onlyfans.com/api2/v2/payouts/balances')) {
          this.balances = (await res.json()) as OFBalances;
        }
        if (res.url().startsWith('https://onlyfans.com/api2/v2/payouts/transactions')) {
          const txs = (await res.json()) as OFTransactionsList;
          this.transactions = txs.list;
        }
        if (res.url().startsWith('https://onlyfans.com/api2/v2/earnings/chart')) {
          // this.
        }
      }
    }
  }
}
