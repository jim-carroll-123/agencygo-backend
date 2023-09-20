import Container, { Service } from 'typedi';
import { getBrowserInstance } from '../config/core';
import { TIMEOUT_BASE, URL_BASE } from '../constant';
import { Page } from 'puppeteer';
import fs from 'fs';
import archiver from 'archiver';
import AdmZip from 'adm-zip';
import { SessionsService } from '@/services/sessions.service';

export interface ILoginProps {
  email: string;
  password: string;
}

@Service()
export class LoginBotService {
  private sesions = Container.get(SessionsService);
  public async execute(props: ILoginProps, id?: string) {
    try {
      const { page, browser } = await getBrowserInstance(id ? `./temp/${id}` : '');
      await new Promise(r => setTimeout(r, TIMEOUT_BASE * 1.5));
      await page.goto(URL_BASE, {
        waitUntil: ['load', 'domcontentloaded'],
      });
      const { email, password } = props;
      await this.inputLogin(page, email, password);
      await this.checkingForCaptcha(page);
      await this.clickLogin(page);
      await browser.close();
      await this.saveSession(id);
    } catch (error) {
      throw error;
    }
  }

  private async inputLogin(page: Page, email: string, password: string) {
    try {
      console.log('input login');
      await page.waitForSelector('input[at-attr="input"][name="email"]', {
        timeout: TIMEOUT_BASE,
      });
      await page.type('input[at-attr="input"][name="email"]', email);
      await page.waitForSelector('input[at-attr="input"][name="password"]', {
        timeout: TIMEOUT_BASE,
      });
      await page.type('input[at-attr="input"][name="password"]', password);
    } catch (error) {
      throw error;
    }
  }

  private async clickLogin(page: Page) {
    try {
      console.log('click login');
      await page.waitForSelector('button[at-attr="submit"][type="submit"]', {
        timeout: TIMEOUT_BASE,
      });
      await page.click('button[at-attr="submit"][type="submit"]');
      await this.isSuccessfulLogin(page);
    } catch (error) {
      throw error;
    }
  }

  private async checkingForCaptcha(page: Page) {
    try {
      console.log('checking for captcha');
      const exist = await page.$('.captcha-solver');
      if (!exist) {
        await new Promise(r => setTimeout(r, TIMEOUT_BASE));
      }
      const captcha = await page.$('.captcha-solver');
      if (captcha) {
        await this.resolveCaptcha(page);
      }
    } catch (error) {
      throw error;
    }
  }

  private async resolveCaptcha(page: Page) {
    try {
      console.log('resolving captcha');
      let solved = false;
      while (!solved) {
        await Promise.all([
          new Promise(async resolver => {
            const exist = await page.$('.captcha-solver[data-state="ready"]');
            if (!exist) {
              await new Promise(r => setTimeout(r, TIMEOUT_BASE));
            }
            const ready = await page.$('.captcha-solver[data-state="ready"]');
            if (ready) {
              console.log('captcha ready');
              await page.click('.captcha-solver[data-state="ready"]');
            }
            resolver(1);
          }),
          new Promise(async resolver => {
            const exist = await page.$('.captcha-solver[data-state="error"]');
            if (!exist) {
              await new Promise(r => setTimeout(r, TIMEOUT_BASE));
            }
            const error = await page.$('.captcha-solver[data-state="error"]');
            if (error) {
              console.log('captcha error');
              await page.click('.captcha-solver[data-state="error"]');
            }
            resolver(1);
          }),
          new Promise(async resolver => {
            const exist = await page.$('.captcha-solver[data-state="solved"]');
            if (!exist) {
              await new Promise(r => setTimeout(r, TIMEOUT_BASE));
            }
            const done = await page.$('.captcha-solver[data-state="solved"]');
            if (done) {
              console.log('captcha done');
              solved = true;
              await new Promise(r => setTimeout(r, 5000));
              await this.clickLogin(page);
            }
            resolver(1);
          }),
        ]);
      }
    } catch (error) {
      throw error;
    }
  }

  private async isSuccessfulLogin(page: Page) {
    try {
      console.log('checking for successful login');
      const exist = await page.$('span[class="b-inside-el g-text-ellipsis"]');
      if (!exist) {
        await new Promise(r => setTimeout(r, TIMEOUT_BASE));
      }
      const homeTitle = await page.$('span[class="b-inside-el g-text-ellipsis"]');
      if (!homeTitle) {
        await this.checkingForCaptcha(page);
      }
      console.log('Login successful');
    } catch (error) {
      throw error;
    }
  }

  public async saveSession(id: string) {
    const folderToZip = `./temp/${id}`;
    const outputZipFilePath = `./uploads/${id}.zip`;
    const outputZipStream = fs.createWriteStream(outputZipFilePath);
    const archive = archiver('zip');
    archive.pipe(outputZipStream);
    archive.directory(folderToZip, false);
    await archive.finalize();
    const fullPath = fs.realpathSync(outputZipFilePath);
    await this.sesions.activeSessionServer(id, fullPath);
  }

  public async unzipSession(zipFilePath: string, id: string) {
    const outputFolder = `./temp/${id}`;
    const zip = new AdmZip(zipFilePath);
    zip.extractAllTo(outputFolder, true);
  }

  public async checkSession(id: string) {
    const { page, browser } = await getBrowserInstance(id ? `./temp/${id}` : './temp');
    try {
      page.goto(URL_BASE, {
        waitUntil: ['load', 'domcontentloaded'],
      });
      await page.waitForSelector('h1[class="g-page-title m-scroll-top"]');
      browser.close();
    } catch (error) {
      browser.close();
      throw error;
    }
  }

  public async cleanupSession(id: string) {
    const path = `./temp/${id}`;
    fs.rmdirSync(path, { recursive: true, maxRetries: 3, retryDelay: 1000 });
  }
}
