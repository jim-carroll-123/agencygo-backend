import { App } from '@/app';
import { AuthRoute } from '@routes/auth.route';
import { UserRoute } from '@routes/users.route';
import { ValidateEnv } from '@utils/validateEnv';
import { AgencyRoute } from '@routes/agency.route';

ValidateEnv();

const app = new App([new UserRoute(), new AuthRoute(), new AgencyRoute()]);

app.listen();
