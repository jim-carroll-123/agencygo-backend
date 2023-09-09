import path from 'path';
import puppeteer from 'puppeteer-extra';
import agents from 'user-agents';
import RecaptchaPlugin from 'puppeteer-extra-plugin-recaptcha';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

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

(async () => {
  const win = await puppeteer.launch({
    headless: false,
    userDataDir: path.join(__dirname, './temp'),
    defaultViewport: null,
    args: ['--start-maximized'],
  });
  const page = await win.newPage();
  await page.setViewport({ width: 1366, height: 768 });
  await page.setUserAgent(agents.random().toString());
  await page.goto('https://onlyfans.com', {
    waitUntil: ['load', 'domcontentloaded'],
  });
  await page.waitForNavigation();
  await page.type('input[at-attr="input"][name="email"]', 'ankur4736@gmail.com');
  await page.type('input[at-attr="input"][name="password"]', 'Test@123');
  await page.click('button[at-attr="submit"][type="submit"]');
  await page.waitForTimeout(5000);
})();
