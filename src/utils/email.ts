import sgMail from "@sendgrid/mail";
import { SENDGRID_API_KEY,SENDER } from "../config/index";
import { Email } from '@/interfaces/common.interface';

sgMail.setApiKey(SENDGRID_API_KEY);
export class Emails {
  public sendEmail = async (emailData: Email): Promise<any> => {
    try {
      const { to, subject,template } = emailData;
      console.log(to, subject)
      const msg = {
        to: to,
        from: SENDER,
        subject: subject,
        html:template
      };

      await sgMail.send(msg);
      let response = {
        status: 200,
        message: "Email send successfully",
        data: {},
      };
     return response
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email');
    }
  };
}
