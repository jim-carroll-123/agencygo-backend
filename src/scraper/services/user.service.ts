import { Service } from 'typedi';
import { getBrowserInstance } from '../config/core';
import { URL_BASE } from '../constant';

@Service()
export class UserBotService {
  public async getProfile() {
    try {
      const { page, browser } = await getBrowserInstance();
      await page.goto(URL_BASE, {
        waitUntil: ['load', 'domcontentloaded'],
      });

      await page.waitForSelector('use[href="/theme/onlyfans/spa/icons/sprite.svg?rev=202309141150-bf9b070aa2#icon-menu"]', {
        timeout: 10000,
      });
      await page.click('use[href="/theme/onlyfans/spa/icons/sprite.svg?rev=202309141150-bf9b070aa2#icon-menu"]');

      const res = await page.waitForResponse(response => response.url().includes('https://onlyfans.com/api2/v2/users/u'));
      const resData = await res?.json();
      await browser.close();
      return resData;
    } catch (error) {
      throw error;
    }
  }
}
