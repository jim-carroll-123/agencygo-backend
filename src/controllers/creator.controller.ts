import { Creator } from '@/interfaces/creator.interface';
import { LoginBotService } from '@/scraper/services/login.service';
import { CreatorService } from '@/services/creator.service';
import { NextFunction, Request, Response } from 'express';
import Container from 'typedi';

export class CreatorController {
  public creator = Container.get(CreatorService);
  private login = Container.get(LoginBotService);

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
      // const creatorId: string = req.params.id;
      const fileSession = req.file;
      await this.login.unzipSession(fileSession.path);
      await this.login.checkSession();

      res.status(200).json({ message: 'creator linked, session valid' });
    } catch (error) {
      next(error);
    }
  };
}
