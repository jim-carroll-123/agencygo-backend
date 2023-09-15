import puppeteer from 'puppeteer-extra';
import { executablePath } from 'puppeteer';
import path from 'path';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

puppeteer.use(StealthPlugin());

export const getBrowserInstance = async () => {
  const pathToExtension = path.join(__dirname, '../extensions/2captcha-solver');
  const browser = await puppeteer.launch({
    headless: false,
    args: [`--disable-extensions-except=${pathToExtension}`, `--load-extension=${pathToExtension}`],
    executablePath: executablePath(),
    userDataDir: './temp',
  });
  const page = await browser.newPage();
  return { page, browser };
};
