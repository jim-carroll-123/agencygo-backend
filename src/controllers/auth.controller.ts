import { Scraper } from '@/scraper';
import { RequestSignUp, RequestWithUser } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import { AuthService } from '@services/auth.service';
import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';

export class AuthController {
  public auth = Container.get(AuthService);
  public scraper = Container.get(Scraper);

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: RequestSignUp = req.body;
      const { user } = await this.auth.signup(userData);
      res.status(201).json({ data: user, message: 'signup successfully' });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.body;
      const { findUser, tokenData } = await this.auth.login(userData);
      res.setHeader('authorization', tokenData.token);
      res.status(200).json({
        data: {
          firstName: findUser.firstName,
          lastName: findUser.lastName,
          email: findUser.email,
          agencyId: findUser.agencyId,
          role: findUser.role,
          Id: findUser._id,
          isAdmin: findUser.isAdmin,
          isAgency: findUser.isAgency,
          isVerfied: findUser.isVerified,
        },
        token: tokenData,
        message: 'login successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.user;
      await this.auth.logout(userData);

      res.setHeader('authorization', ['Authorization=; Max-age=0']);
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
  public forgotPassword = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const getEmail = req.body.email;
      const response = await this.auth.forgotpassword(getEmail);
      res.status(200).json({ response });
    } catch (error) {
      next(error);
    }
  };
}
