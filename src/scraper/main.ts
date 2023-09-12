import path from 'path';
import puppeteer from 'puppeteer-extra';
import agents from 'user-agents';
import RecaptchaPlugin from 'puppeteer-extra-plugin-recaptcha';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import SessionPlugin, { StorageProviderName } from 'puppeteer-extra-plugin-session';
import fs from 'fs';
import { Document } from 'mongoose';

puppeteer.use(StealthPlugin());
puppeteer.use(
  RecaptchaPlugin({
    provider: {
      id: '2captcha',
      token: '054855c660c6e582c36a3e209fbeace3',
    },
    visualFeedback: true, // colorize reCAPTCHAs (violet = detected, green = solved)
  }),
);
puppeteer.use(SessionPlugin());

(async () => {
  const win = await puppeteer.launch({
    headless: false,
    userDataDir: path.join(__dirname, './temp'),
    defaultViewport: null,
    args: ['--start-maximized', '--disable-extensions', '--disable-web-security', '--disable-features=IsolateOrigins,site-per-process'],
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  });
  const page = await win.newPage();
  await page.setViewport({ width: 1366, height: 768 });
  await page.setUserAgent(agents.random().toString());

  const login = async () => {
    await page.goto('https://onlyfans.com', {
      waitUntil: ['load', 'domcontentloaded'],
    });
    await page.waitForNavigation();
    await page.waitForTimeout(5000);
    await page.type('input[at-attr="input"][name="email"]', 'ankur4736@gmail.com');
    await page.type('input[at-attr="input"][name="password"]', 'Test@123');
    await page.click('button[at-attr="submit"][type="submit"]');
    await page.waitForTimeout(5000);
    /* Check if captcha is there */
    const captcha = await page.$$('div[data-v-0a03e54f][data-v-06a525d1].captcha_wrapper.g-input__wrapper.m-captcha.m-visible');

    if (captcha) {
      const captchaSolver = await page.solveRecaptchas();
      console.log(captchaSolver);
      /* const frameHandle = await page.$('iframe[title="reCAPTCHA"]');
      const frame = await frameHandle.contentFrame();
      await frame.click('#rc-anchor-container');
      await page.evaluate(() => {
        const button = document.querySelector('button[data-v-06a525d1][at-attr="submit"].g-btn.m-rounded.m-block.m-md.mb-0');
        button.removeAttribute('disabled');
      });
      await page.click('button[at-attr="submit"][type="submit"]'); */
    }
  };

  await login();
})();
