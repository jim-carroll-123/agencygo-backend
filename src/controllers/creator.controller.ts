import { Creator } from '@/interfaces/creator.interface';
import { LoginBotService } from '@/scraper/services/login.service';
import { IProxy } from '@interfaces/proxy.interface';
import { CreatorService } from '@/services/creator.service';
import { NextFunction, Request, Response } from 'express';
import { getBrowserInstance } from '../scraper/config/core';
import Container from 'typedi';
import { StorageService } from '../services/storage.service';
import path from 'path';
import AdmZip from 'adm-zip';
import fs from 'fs';
import { uploadToS3 } from '@/utils/fileUpload';

export class CreatorController {
  public creator = Container.get(CreatorService);
  private login = Container.get(LoginBotService);
  private storage = Container.get(StorageService);

  public getCreators = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllCreatorsData: Creator[] = await this.creator.getCreators();

      res.status(200).json({ data: findAllCreatorsData, message: 'success' });
    } catch (error) {
      next(error);
    }
  };

  public createCreator = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const creatorData: Creator = req.body;
      console.log(req.file);
      console.log(creatorData);
      if (req.file) {
        const originalnameWithoutSpaces = req.file.originalname.replace(/\s/g, '');
        const result = await uploadToS3(req.file.buffer, originalnameWithoutSpaces + Date.now() + path.extname(req.file.originalname));
        creatorData.creatorName = result.Location;
      }
      const creatorDetails: Creator = await this.creator.createCreator(creatorData);

      res.status(201).json({ data: creatorDetails, message: 'creator added successfully' });
    } catch (error) {
      next(error);
    }
  };

  public updateCreator = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const creatorData: Creator = req.body;
      const updateCreatorData: Creator = await this.creator.updateCreator(id, creatorData);
      res.status(201).json({ data: updateCreatorData, message: 'creator updated successfully' });
    } catch (error) {
      next(error);
    }
  };

  public _deleteCreator = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const creatorId: string = req.params.id;
      const deleteCreatorData: Creator = await this.creator.deleteCreator(creatorId);

      res.status(200).json({ data: deleteCreatorData, message: 'creator deleted' });
    } catch (error) {
      next(error);
    }
  };

  public getCreatorByAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const creatorId: string = req.params.creatorId;
      const creatorDetails: Creator = await this.creator.getCreator(creatorId);

      res.status(200).json({ data: creatorDetails });
    } catch (error) {
      next(error);
    }
  };

  public loginOnlyfans = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const creatorId = req.query.creatorId as string;
      console.log(creatorId);

      await this.login.execute({
        email: req.body.email,
        password: req.body.password,
        creatorId,
      });
      res.status(200).json({ data: {}, message: 'creator logged in, session valid' });
    } catch (error) {
      next(error);
    }
  };

  public generateProxy = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const creatorId: string = req.params.creatorId;
      const proxyAddress = await this.creator.createProxy(creatorId);
      res.status(200).json({ proxy: proxyAddress });
    } catch (error) {
      next(error);
    }
  };

  public getProxyByCreator = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const creatorId: string = req.params.creatorId;
      const findProxy: IProxy = await this.creator.getProxy(creatorId);
      res.status(200).json({ data: findProxy });
    } catch (error) {
      next(error);
    }
  };
  public assignCreatorToEmployee = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const creatorsId: any[] = req.body.creatorId;
      const employeeId: any = req.body.employeeId;
      const assignCreator = await this.creator.assignCreatorToEmployee(creatorsId, employeeId);
      res.status(200).json({ message: 'creators added to employees', data: assignCreator });
    } catch (error) {
      next(error);
    }
  };

  public searchFilter = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const queryData = req.query;
      const creator = await this.creator.searchCreator(queryData);
      res.status(200).json({ data: creator, message: 'creator fetched successfully' });
    } catch (error) {
      next(error);
    }
  };

  public scrapeCreatorFinananceReports = async (req: Request, res: Response, next: NextFunction) => {
    const proxy = {
      proxy_user: { username: 'agusr33', user_pass: 'agusr33' },
      proxy: {
        username: 'agusr33',
        hostname: 'geo.iproyal.com',
        port: 12321,
        password: 'agusr33_country-us',
        protocol: 'http|https',
      },
    };

    const sessionBucket = {
      ServerSideEncryption: 'AES256',
      Location: 'https://agencygo-public.s3.us-east-2.amazonaws.com/server-agusr33.zip',
      Bucket: 'agencygo-public',
      Key: 'server-agusr33.zip',
      ETag: '"48c14c3f493960b1547b421dd40c644d-3"',
    };

    const usrDataDir = path.join(__dirname, `../scraper/temp/${proxy.proxy_user.username}`);

    function directoryHasFiles(directoryPath: string) {
      try {
        // Attempt to read the contents of the directory
        const files = fs.readdirSync(directoryPath);
        // Check if there are any files in the directory
        return files.length > 0;
      } catch (error) {
        // Handle the error, such as directory not existing
        console.error(`Error reading directory: ${error.message}`);
        return false; // Directory doesn't exist or couldn't be read
      }
    }

    const unzipBuffer = async (buffer: Buffer) => {
      const zip = new AdmZip(buffer);
      zip.extractAllTo(usrDataDir, true);
    };

    try {
      if (!directoryHasFiles(usrDataDir)) {
        const file = await this.storage.getFile(sessionBucket.Key, sessionBucket.Bucket);
        await unzipBuffer(file.Body as any);
      }

      const { browser, page } = await getBrowserInstance(proxy.proxy, usrDataDir);

      function logToFile(logMessage, logFilePath) {
        const logLine = `${logMessage}\n`;

        fs.appendFile(logFilePath, logLine, err => {
          if (err) {
            console.error(`Error writing to the log file: ${err}`);
          } else {
            console.log(`Logged: ${logMessage}`);
          }
        });
      }

      page.on('response', async pageReq => {
        const url = pageReq.url();
        if (url.includes('https://onlyfans.com/api2/v2/payouts/transactions')) {
          const data = await pageReq.json();
          res.send(data);
        }
      });

      await page.goto('https://onlyfans.com/my/statistics/statements/earnings', {
        waitUntil: ['load', 'domcontentloaded'],
      });

      // await page.waitForTimeout(40000);

      // await browser.close();

      // res.send(sessionBucket);
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  };
}
