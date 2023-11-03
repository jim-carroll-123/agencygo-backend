import puppeteer from 'puppeteer-extra';
import { executablePath } from 'puppeteer';
import path from 'path';
import pluginProxy from 'puppeteer-extra-plugin-proxy';

const proxy = {
  hostname: 'geo.iproyal.com',
  port: 12321,
  username: 'agusr57654',
  password: 'agusr57654_country-us_streaming-1',
};

const main = async () => {
  puppeteer.use(
    pluginProxy({
      address: proxy.hostname,
      port: proxy.port,
      credentials: {
        username: proxy.username,
        password: proxy.password,
      },
    }),
  );

  const browser = await puppeteer.launch({
    headless: false,
    executablePath: executablePath(),
    userDataDir: path.join(__dirname, './temp'),
    args: [`--disable-extensions`],
  });

  const page = await browser.newPage();
  await page.goto('https://iproyal.com/ip-lookup/');
  return;
  await page.goto('https://onlyfans.com');

  await page.waitForSelector('input[at-attr="input"][name="email"]');
  await page.type('input[at-attr="input"][name="email"]', 'ankur4736@gmail.com');
  await page.waitForSelector('input[at-attr="input"][name="password"]');
  await page.type('input[at-attr="input"][name="password"]', 'Test@123');

  await page.waitForSelector('button[at-attr="submit"][type="submit"]');
  await page.click('button[at-attr="submit"][type="submit"]');
};

main();
