import puppeteer from 'puppeteer-extra';
import path from 'path';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import pluginProxy from 'puppeteer-extra-plugin-proxy';
import fs from 'fs';
import chromePath from 'locate-chrome';

// Define the path to the config.js file
const modifyProxySettingsInExtension = proxyUrl => {
  const configFilePath = path.join(__dirname, '../extensions/2captcha-solver/common/config.js');
  fs.readFile(configFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading config file:', err);
    } else {
      // Find and replace the 'proxy' value using a regular expression
      const updatedContent = data.replace(/proxy:\s*".*?"/, `proxy: "${proxyUrl}"`).replace(/useProxy:\s*false/, 'useProxy: true');

      // Write the updated content back to the file
      fs.writeFile(configFilePath, updatedContent, err => {
        if (err) {
          console.error('Error writing config file:', err);
        } else {
          console.log('Proxy variable updated successfully.');
        }
      });
    }
  });
};

export const getBrowserInstance = async (
  proxy: {
    username: string;
    hostname: string;
    port: number;
    password: string;
  },
  userDataDir?: string,
) => {
  const proxyUrl = `${proxy.username}:${proxy.password}@${proxy.hostname}:${proxy.port}`;
  modifyProxySettingsInExtension(proxyUrl);
  puppeteer.use(StealthPlugin());
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
  const chromeExecPath = await chromePath();
  const pathToExtension = path.join(__dirname, '../extensions/2captcha-solver');
  let config: any = {
    headless: true,
    args: [
      `--disable-extensions-except=${pathToExtension}`,
      `--load-extension=${pathToExtension}`,
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-gpu',
      '--disable-dev-shm-usage',
    ],
    executablePath: chromeExecPath,
  };

  console.log('Puppeteer chrome path', chromeExecPath);

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
