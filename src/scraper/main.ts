import 'reflect-metadata';
// import puppeteer, { PuppeteerExtra } from 'puppeteer-extra';
// import { HTTPRequest, HTTPResponse, executablePath } from 'puppeteer';
// import pluginProxy from 'puppeteer-extra-plugin-proxy';
// import Stealth from 'puppeteer-extra-plugin-stealth';
// import path from 'path';
import { Scraper } from '.';
import Container from 'typedi';
import path from 'path';

const scraper = Container.get(Scraper);

scraper.openClient(path.join(__dirname, './temp'));
