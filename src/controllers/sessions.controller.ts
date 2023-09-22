import { Session, SessionStatus, SessionType } from '@/interfaces/sessions.interface';
import { LoginBotService } from '@/scraper/services/login.service';
import { CreatorService } from '@/services/creator.service';
import { SessionsService } from '@/services/sessions.service';
import { NextFunction, Request, Response } from 'express';
import Container, { Service } from 'typedi';
import fs from 'fs';

@Service()
export class SessionsController {
  private login = Container.get(LoginBotService);
  private creator = Container.get(CreatorService);
  private session = Container.get(SessionsService);

  public createSessionClient = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const creatorId: string = req.params.id;
      const fileSession = req.file;
      const creator = await this.creator.getCreatorById(creatorId);
      const payload: Session = {
        url: fileSession.path,
        creatorId: creator._id,
        type: SessionType.Client,
        status: SessionStatus.Active,
      };
      const newSession = await this.session.createSession(payload);
      res.status(200).json({ data: newSession, message: 'session created' });
    } catch (error) {
      next(error);
    }
  };

  public createSessionServer = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const creatorId: string = req.params.id;
      const { email, password } = req.body;
      const creator = await this.creator.getCreatorById(creatorId);
      const payload: Session = {
        creatorId: creator._id,
        type: SessionType.Server,
        status: SessionStatus.Inactive,
      };
      const newSession = await this.session.createSession(payload);
      this.login.execute({ email, password }, newSession._id);
      res.status(200).json({ data: newSession, message: 'session created' });
    } catch (error) {
      next(error);
    }
  };

  public getSessionClient = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const creatorId: string = req.params.id;
      const sessions = await this.session.getSessionByCreatorId(creatorId, SessionType.Client);
      const file = fs.readFileSync(sessions.url);
      const fileName = `${creatorId}.zip`;
      res.setHeader('Content-Type', 'application/zip');
      res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
      res.send(file);
    } catch (error) {
      next(error);
    }
  };
}
