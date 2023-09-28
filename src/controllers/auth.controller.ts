import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { RequestSignUp, RequestWithUser } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import { AuthService } from '@services/auth.service';
import { Scraper } from '@/scraper';

export class AuthController {
  public auth = Container.get(AuthService);
  public scraper = Container.get(Scraper);

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: RequestSignUp = req.body;
      const { cookie, user } = await this.auth.signup(userData);
      res.setHeader('Set-Cookie', [cookie]);
      res.status(201).json({ data: user, message: 'signup successfully' });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.body;
      const { cookie, findUser } = await this.auth.login(userData);

      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({ data: findUser, message: 'login successfully' });
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.user;
      await this.auth.logout(userData);

      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json({ message: 'logout' });
    } catch (error) {
      next(error);
    }
  };

  public verify = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.user;
      const verifyResponse = await this.auth.verify(userData);

      const response = {
        user: userData,
        ...verifyResponse,
      };

      res.status(200).json({ data: response, message: 'verify' });
    } catch (error) {
      next(error);
    }
  };
}
