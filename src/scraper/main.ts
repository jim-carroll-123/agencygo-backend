import 'reflect-metadata';
// import puppeteer, { PuppeteerExtra } from 'puppeteer-extra';
// import { HTTPRequest, HTTPResponse, executablePath } from 'puppeteer';
// import pluginProxy from 'puppeteer-extra-plugin-proxy';
// import Stealth from 'puppeteer-extra-plugin-stealth';
// import path from 'path';
import { OnlyFansClient } from './external/onlyfans/onlyfans.client';
import Container from 'typedi';
import path from 'path';

const onlyfans = Container.get(OnlyFansClient);

onlyfans.openClient(path.join(__dirname, './temp'));
