import exress from 'express';
import routes from './routes';
import errorHander from './middleware/errorHandler';

const createServer = () => {
  const app = exress();

  app.use(exress.json());
  app.use('/api', routes);
  app.use(errorHander);
  return app;
}

export default createServer;