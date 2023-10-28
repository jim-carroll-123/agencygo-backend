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
ValidateEnv();

const app = new App([
  new UserRoute(),
  new AuthRoute(),
  new AgencyRoute(),
  new InvoicingRoute(),
  new EmployeeRoute(),
  new CreatorRoute(),
  new SessionsRoute(),
  new PayrollRoute(),
  new EmailRoute(),
  new RoleRoute(),
  new ShiftRoute(),
]);

app.listen();
