import{Emails} from '@utils/email'
import {Email} from '@/interfaces/common.interface'
import { NextFunction, Request, Response } from 'express';
import {generateEmailTemplateForActivation}from '../template/activateEmployee'
import {generateEmailTemplateForResetPassword}from '../template/resetPassword'
import { EmployeeModel } from '@/models/employee.model';
import { AgencyModel } from '@/models/agency.model';
export class EmailController {
  public sendEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params._id;
      const employee  = await EmployeeModel.findOne({ _id: id });
      const agency = await AgencyModel.findOne({ _id: employee.agencyId });
      let template= generateEmailTemplateForActivation(id,agency.agencyName)
      let emailData:Email={
        to:req.body.to,
        subject:"Account activation",
        template:template
      }
      const emailDatas: Email = await new Emails().sendEmail(emailData)

      res.status(201).json({ data: emailDatas });
    } catch (error) {
      next(error);
    }
  };
  public sendEmailForResetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params._id;
      const employee  = await EmployeeModel.findOne({ _id: id });
      let template= generateEmailTemplateForResetPassword(employee)
      let emailData:Email={
        to:employee.email,
        subject:"Reset Password",
        template:template
      }
      const emailDatas: Email = await new Emails().sendEmail(emailData)

      res.status(201).json({ data: emailDatas });
    } catch (error) {
      next(error);
    }
  };
}
