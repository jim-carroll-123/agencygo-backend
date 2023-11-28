import { Emails } from '@utils/email';
import { Email } from '@/interfaces/common.interface';
import { NextFunction, Request, Response } from 'express';
import { generateEmailTemplateForActivation } from '../template/activateEmployee';
import { generateEmailTemplateForResetPassword } from '../template/resetPassword';
import { EmployeeModel } from '@/models/employee.model';
import { AgencyModel } from '@/models/agency.model';
import { uploadToS3 } from '@/utils/fileUpload';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
export class EmailController {
  public sendEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params._id;
      const employee = await EmployeeModel.findOne({ _id: id });
      const agency = await AgencyModel.findOne({ _id: employee.agencyId });
      let template = generateEmailTemplateForActivation(id, agency.agencyName);
      let emailData: Email = {
        to: employee.email,
        subject: 'Account activation',
        template: template,
      };
      const emailDatas: Email = await new Emails().sendEmail(emailData);

      res.status(201).json({ data: emailDatas });
    } catch (error) {
      next(error);
    }
  };
  public sendEmailForResetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params._id;
      const employee = await EmployeeModel.findOne({ _id: id });
      let template = generateEmailTemplateForResetPassword(employee);
      let emailData: Email = {
        to: employee.email,
        subject: 'Reset Password',
        template: template,
      };
      const emailDatas: Email = await new Emails().sendEmail(emailData);

      res.status(201).json({ data: emailDatas });
    } catch (error) {
      next(error);
    }
  };
}

const makeid = length => {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export class ImageUpload {
  public handleUpload = upload.single('creatorImage');

  public uploadImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      this.handleUpload(req, res, async (err: any) => {
        if (err) {
          return res.status(400).json({ message: 'Error uploading file' });
        }

        if (!req.file) {
          return res.status(400).json({ message: 'No file uploaded' });
        }

        const ext = req.file.originalname.split('.').pop();
        const temp_id = makeid(10);
        const file_name = `${temp_id}.${ext}`;

        const s3Result = await uploadToS3(req.file.buffer, file_name);

        const data = s3Result.Location;
        res.status(201).json({ data: data, message: 'File uploaded successfully' });
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  };
}
