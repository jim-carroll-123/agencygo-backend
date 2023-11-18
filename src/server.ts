import { App } from '@/app';
import { AuthRoute } from '@routes/auth.route';
import { UserRoute } from '@routes/users.route';
import { EmployeeRoute } from './routes/employee.route';
import { ValidateEnv } from '@utils/validateEnv';
import { AgencyRoute } from '@routes/agency.route';
import { CreatorRoute } from './routes/creator.route';
import { SessionsRoute } from './routes/sessions.route';
import { EmailRoute } from '@routes/common.route';
import { RoleRoute } from './routes/roles.route';
import { ShiftRoute } from './routes/shift.route';
import { InvoicingRoute } from './routes/invoicing.route';
import { PayrollRoute } from './routes/payroll.routes';
import { smartTagsRoute } from './routes/smarttags.route';
// import { PayrollRoute } from './routes/payroll.routes';
import { ChatRoute } from './routes/chat.route';
ValidateEnv();

const app = new App([
  new UserRoute(),
  new AuthRoute(),
  new AgencyRoute(),
  new InvoicingRoute(),
  new PayrollRoute(),
  // new PayrollRoute(),
  new EmployeeRoute(),
  new CreatorRoute(),
  new SessionsRoute(),
  new smartTagsRoute(),
  new EmailRoute(),
  new RoleRoute(),
  new ShiftRoute(),
  new ChatRoute(),
]);

try {
  app.listen();
} catch (err) {
  console.log(err);
}


process.on("uncaughtException",(err)=>{
  console.log(err)
})