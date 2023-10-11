import{Emails} from '@utils/email'
import {Email} from '@/interfaces/common.interface'
import { NextFunction, Request, Response } from 'express';
export class EmailController {
  public sendEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let emailData:Email={
        to:req.body.to,
        subject:"this is for testing"
      }
      const emailDatas: Email = await new Emails().sendEmail(emailData)

      res.status(201).json({ data: emailDatas });
    } catch (error) {
      next(error);
    }
  };
}
