import ExpressApp from './app';
import { Environment } from './utils/environment';

try {
  const express = require('express');
  const next = require('next');

  const port = parseInt(`${Environment.port}`, 10) || 3000;
  const dev = process.env.NODE_ENV !== 'production';

  const app = next({ dev });
  const handle = app.getRequestHandler();

  app.prepare().then(() => {
    const server = express();

    server.get('/', (req, res) => {
      return app.render(req, res, '/', req.query);
    });

    const expApp = new ExpressApp(server);
    expApp.setUp();
    server.all('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(port, err => {
      if (err) {
        console.log('ERROR');
        console.log(err);
        throw err;
      }
      console.log(`> Ready on http://localhost:${port}`);
    });
  });
} catch (err) {
  console.log('ERROR');
  console.log(err);
}
