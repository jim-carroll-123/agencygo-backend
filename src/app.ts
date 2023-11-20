import 'reflect-metadata';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import { connect, set, ConnectOptions } from 'mongoose';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { NODE_ENV, PORT, LOG_FORMAT, ORIGIN, CREDENTIALS } from '@config';
import { dbConnection } from './database/index';
import { Routes } from '@interfaces/routes.interface';
import { ErrorMiddleware } from '@middlewares/error.middleware';
import { logger, stream } from '@utils/logger';
import logRoutes from './utils/routes-logger';

import { Server as HttpServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { initializeWebSocket } from '../src/controllers/chat.controller';
import path from 'path';

export class App {
  public app: express.Express;
  public env: string;
  public port: string | number;

  private server: HttpServer;
  public io: SocketIOServer;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 3000;
    this.io = new SocketIOServer(this.server);


    const pdfDirectory = path.join(__dirname, 'assets', 'pdf');
    this.app.use('/pdf', express.static(pdfDirectory));

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }
  public listen() {
    try {
      this.server = this.app.listen(this.port, () => {
        logger.info(`=================================`);
        logger.info(`======= ENV: ${this.env} =======`);
        logger.info(`🚀 App listening on the port ${this.port}`);
        logger.info(`=================================`);
        logRoutes(this.app);
      });



   
      /* Socket will never close */
      this.server.timeout = 0;
      initializeWebSocket(this.server);
    } catch (err) {
      console.log(err);
    }
  }

  public getServer() {
    return this.app;
  }

  // private initializeSocketIO() {
  //   console.log(1)
  //   const options = {
  //     cors: {
  //       origin: "*",
  //     },
  //   };
  //   this.io = new SocketIOServer(this.server, options);

  //   this.io = new SocketIOServer(this.server);

  //   this.io.on('connection', (socket) => {
  //     console.log('Client connected');
  //     console.log('socket',socket)
  //   });
  // }

  private async connectToDatabase() {
    if (this.env !== 'production') {
      set('debug', true);
      set('strictQuery', false); // for remove the warning
    }

    try {
      await connect(dbConnection.url, dbConnection.options as ConnectOptions);
      logger.info('Connected to database');
    } catch (err) {
      logger.error('DB connection failed');
    }
  }

  private initializeMiddlewares() {
    this.app.use(morgan(LOG_FORMAT, { stream }));
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    // this.app.use((req, res, next) => {
    //   res.setHeader('Access-Control-Expose-Headers', 'Authorization');
    //   next();
    // });
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
    this.app.use('/health', (req, res) => {
      res.send({
        state: 'ready',
        version: '0.1',
      });
    });
  }

  private initializeErrorHandling() {
    this.app.use(ErrorMiddleware);
  }
}
