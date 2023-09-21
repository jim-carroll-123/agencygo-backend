import Table from 'cli-table';
import chalk from 'chalk';
import { type Express } from 'express';
import * as config from '../config/index';

type TReqMethod = 'GET' | 'PUT' | 'PATCH' | 'POST' | 'DELETE' | '';

interface RoutesArrItem {
  method: TReqMethod;
  path: string;
}

const logRoutes = (app: Express): void => {
  /*
   * new Table is instance from npm library cli-table
   * https://www.npmjs.com/package/cli-table
   */
  const cliT = new Table({
    head: [chalk.green('Method'), chalk.green('Route Path')],
  });

  const routes: Array<{ method: TReqMethod; path: string }> = [];

  function cleanURL(url: string): string {
    // Use JSON.parse to unescape the backslashes (requires double-escaped backslashes in the input)
    const unescapedURL = JSON.parse(`"${url}"`);

    // Remove caret (^) followed by a slash (/)
    const cleanedURL = unescapedURL
      .replace(/\^\/+/g, '/')
      .replace(/\/\?\(\?=\/\|\$\)/g, '')
      .replace(/([^:]\/)\/+/g, '$1')
      .replace(/\/i\//g, '/');

    return cleanedURL;
  }

  const renderMethod = (method: TReqMethod): string => {
    if (method === 'GET') return chalk.green.bold(` ${method} `);
    if (method === 'POST') return chalk.blue.bold(` ${method} `);
    if (method === 'PATCH') return chalk.yellow.bold(` ${method} `);
    if (method === 'PUT') return chalk.magenta.bold(` ${method} `);
    if (method === 'DELETE') return chalk.red.bold(` ${method} `);
    return chalk.gray(` ${method} `);
  };

  const parseRoute = (def: any, basePath = ''): void => {
    if (def.route) {
      const method = Object.keys(def.route.methods)[0].toUpperCase() as TReqMethod;
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      const path = `${basePath}${def.route.path}`; // Concatenate the current route with the basePath
      const routeData: RoutesArrItem = { method, path };

      routes.push(routeData);
    } else if (def.name === 'router') {
      // nested route (sub router)..
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      const routerBasePath = `${basePath}${def.regexp}`; // Get the basePath for the sub-router
      def.handle.stack.forEach((nestedDef: any) => {
        parseRoute(nestedDef, routerBasePath);
      });
    }
  };

  // loop over and parse routes
  app._router.stack.forEach((def: any) => {
    parseRoute(def, `http://localhost:${config.PORT}`);
  });

  // sort routes in correct order
  routes.sort((a: RoutesArrItem, b: RoutesArrItem) => {
    const methodOrder: any = {
      GET: 1,
      POST: 2,
      PUT: 3,
      PATCH: 4,
      DELETE: 5,
    };

    return methodOrder[a.method] - methodOrder[b.method];
  });

  // push the sorted routes to the cliT (cli-table instance)
  routes.forEach(route => {
    // cleanURL(route.path);
    cliT.push([renderMethod(route.method as any), cleanURL(route.path)]);
  });

  // eslint-disable-next-line no-console
  console.log(cliT.toString());
};

export default logRoutes;
