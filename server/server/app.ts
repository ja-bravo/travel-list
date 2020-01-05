import { ApolloServer } from 'apollo-server-express';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import Schema from './graphql/schema';
import './models/database';
import { Environment } from './utils/environment';

import jwtHelper from './utils/jwt';
class App {
  public app: express.Application;

  constructor(app: any) {
    this.app = app;
  }

  public setUp() {
    this.middlewares();
    this.routes();
    this.errorHandler();
  }

  private async middlewares() {
    this.app.use(bodyParser.json({ limit: '50mb' }));
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(cors());

    const server = new ApolloServer({
      schema: Schema,
      context: async ({ req }) => {
        const token: string = req.headers.authorization || '';
        const cleanToken = token.substring(7);
        const valid = jwtHelper.verify(cleanToken);
        return {
          cleanToken,
          user: valid,
          models: {
            Token: { cleanToken },
          },
        };
      },
    });
    server.applyMiddleware({ app: this.app });
  }

  private routes() {
    this.app.use(
      '/healthcheck',
      require('express-healthcheck')({
        healthy: () => {
          const jsMemory = Math.round(process.memoryUsage().heapUsed / (1024 * 1024));
          const ram = Math.round(process.memoryUsage().rss / (1024 * 1024));
          return {
            isProd: Environment.isProd,
            uptime: process.uptime(),
            version: process.env.npm_package_version,
            memory: {
              node: `${jsMemory} MB`,
              totalApp: `${ram} MB`,
            },
          };
        },
      }),
    );
  }

  private errorHandler() {
    console.error('Setting up error handler');
    this.app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
      console.error(err.message, err.stack);
      res.status(500).end('Unexpected error');
    });
  }
}
export default App;
