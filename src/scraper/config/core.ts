import puppeteer from 'puppeteer-extra';
import { executablePath } from 'puppeteer';
import path from 'path';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

puppeteer.use(StealthPlugin());

export const getBrowserInstance = async (userDataDir?: string) => {
  const pathToExtension = path.join(__dirname, '../extensions/2captcha-solver');
  let config: any = {
    headless: true,
    args: [`--disable-extensions-except=${pathToExtension}`, `--load-extension=${pathToExtension}`],
    executablePath: executablePath(),
  };
  if (userDataDir) {
    config = {
      ...config,
      userDataDir,
    };
  }
  const browser = await puppeteer.launch(config);
  const page = await browser.newPage();
  return { page, browser };
};
