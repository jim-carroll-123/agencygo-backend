import { NextFunction, Request, Response } from 'express';
// import { Scraper } from '@/scraper';
import { RequestSignUp, RequestWithUser, DataStoredInToken } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import { AuthService } from '@services/auth.service';
import { Container } from 'typedi';
import { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_SECRET_KEY, TWILIO_API_KEY, SECRET_KEY } from '@config';
import { sign } from 'jsonwebtoken';
import twilio from 'twilio';

const createToken = (user: User): any => {
  const dataStoredInToken: DataStoredInToken = { _id: user._id };
  const expiresIn: number = 60 * 60 * 24;

  return { expiresIn, token: sign(dataStoredInToken, SECRET_KEY, { expiresIn }) };
};
export class AuthController {
  public auth = Container.get(AuthService);
  // public scraper = Container.get(Scraper);

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
      res.setHeader('Authorization', '');
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

  public generatetwiliotoken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
      const AccessToken = twilio.jwt.AccessToken;
      const ChatGrant = AccessToken.ChatGrant;

      // const accountSid = process.env.TWILIO_ACCOUNT_SID;
      // const apiKeySid = process.env.TWILIO_API_KEY;

      // const userData = req.body;
      // const { tokenData } = await this.auth.generatetoken(userData);

      const identity = req.body.email;
      // Create an access token
      const accessToken = new AccessToken(TWILIO_ACCOUNT_SID, TWILIO_API_KEY, TWILIO_SECRET_KEY, {
        identity: identity,
      });
      // Add a Chat grant to the token
      const chatGrant = new ChatGrant();
      accessToken.addGrant(chatGrant);

      // Serialize the token to a JWT
      const token = accessToken.toJwt();
      // const tokenData = createToken(accessToken);
      res.status(200).json({
        // data: { tokenData, accessToken: token },
        data: token,
        message: 'token get',
      });
    } catch (error) {
      next(error);
    }
  };

  public getTwilioToken = async (req: Response, res: Response, next: NextFunction) => {
    try {
      if (req.header['token']) {
        res.send({ token: req.header['token'], username: req.header['username'] });
      } else {
        next({ status: 404, message: 'Token not set' });
      }
    } catch (error) {
      next(error);
    }
  };
}
