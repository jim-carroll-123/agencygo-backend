import { App } from '@/app';
import { AuthRoute } from '@routes/auth.route';
import { UserRoute } from '@routes/users.route';
import { EmployeeRoute } from './routes/employee.route';
import { ValidateEnv } from '@utils/validateEnv';
import { AgencyRoute } from '@routes/agency.route';
import { CreatorRoute } from './routes/creator.route';

ValidateEnv();

const app = new App([new UserRoute(), new AuthRoute(), new AgencyRoute(), new EmployeeRoute(), new CreatorRoute()]);

app.listen();
