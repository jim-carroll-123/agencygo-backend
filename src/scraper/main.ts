import puppeteer from 'puppeteer-extra';
import { executablePath } from 'puppeteer';
import pluginProxy from 'puppeteer-extra-plugin-proxy';
import Stealth from 'puppeteer-extra-plugin-stealth';

const proxy = {
  hostname: 'geo.iproyal.com',
  port: 12321,
  username: 'ryb6AD',
  password: 'ryb6AD',
};

puppeteer.use(Stealth());
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

const main = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    executablePath: executablePath('chrome'),
    // userDataDir: path.join(__dirname, './temp'),
    args: ['--start-maximized', `--disable-extensions`],
  });

  const page = await browser.newPage();
  await page.goto('https://fingerprint.com/');
};

main();
