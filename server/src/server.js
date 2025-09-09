import express from 'express';
import cors from 'cors';

import getEnvVar from './utils/getEnvVar.js';
import ENV_VARS from './constants/env.js';

import contactsRouter from './routers/index.js';

import notFoundHandler from './middlewares/notFoundHandler.js';
import errorHandler from './middlewares/errorHandler.js';

import cookieParser from 'cookie-parser';

const startServer = () => {
  const app = express();

  app.use(
    express.json({
      type: ['application/json', 'application/vnd.api+json'],
      limit: '100kb',
    }),
  );
  app.use(cors());

  app.use(cookieParser());

  // app.use(contactsRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  const PORT = Number(getEnvVar(ENV_VARS.PORT, '5001'));
  app.listen(PORT, () => {
    console.log(`Server is running on port `, PORT);
  });
};

export default startServer;
