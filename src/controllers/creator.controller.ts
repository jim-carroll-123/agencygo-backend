import { Creator, SessionStatus } from '@/interfaces/creator.interface';
import { LoginBotService } from '@/scraper/services/login.service';
import { CreatorService } from '@/services/creator.service';
import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import Container from 'typedi';

export class CreatorController {
  public creator = Container.get(CreatorService);
  private login = Container.get(LoginBotService);

  public getCreators = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllCreatorsData: Creator[] = await this.creator.getCreators();

      res.status(200).json({ data: findAllCreatorsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public createCreator = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const creatorData: Creator = req.body;
      const creatorDetails: Creator = await this.creator.createCreator(creatorData);

      res.status(201).json({ data: creatorDetails, message: 'creator added successfully' });
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

  public linkingOnlyfans = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const creatorId: string = req.params.id;
      const fileSession = req.file;
      // await this.login.unzipSession(fileSession.path, creatorId);
      // await this.login.checkSession(creatorId);
      // await this.login.cleanupSession(creatorId);
      const creator = await this.creator.getCreatorById(creatorId);
      const payload = Object.assign(creator, {
        session: {
          url: fileSession.path,
          status: SessionStatus.Active,
        },
      });
      const newCreator = await this.creator.updateCreator(creatorId, payload);

      res.status(200).json({ data: newCreator, message: 'creator linked, session valid' });
    } catch (error) {
      next(error);
    }
  };

  public loginOnlyfans = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const creatorId: string = req.params.id;
      this.login.execute(
        {
          email: req.body.email,
          password: req.body.password,
        },
        creatorId,
      );

      res.status(200).json({ data: {}, message: 'creator logged in, session valid' });
    } catch (error) {
      next(error);
    }
  };

  public getCreatorSession = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const creatorId: string = req.params.id;
      const creator = await this.creator.getCreatorById(creatorId);
      // get session file
      const file = fs.readFileSync(creator.session.url);
      // naming the file
      const fileName = `${creatorId}.zip`;
      // set header
      res.setHeader('Content-Type', 'application/zip');
      res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
      // send file
      res.send(file);
    } catch (error) {
      next(error);
    }
  };
}
