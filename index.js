import express from 'express';
const app = express();
import config from './config/config.js';

import imageMiddleware from './middleware/image.middleware.js';
import staticMiddleware from './middleware/static.middleware.js';
import csrfMiddleware from './middleware/csrf.middleware.js';
import sessionMiddleware from './middleware/session.middleware.js';
import authUserMiddleware from './middleware/auth-user.middleware.js';
import errorMiddleware from './middleware/error.middleware.js';

import routerApi from './routes/index.js';
import getMongoDbConnection from './libs/mongoose.js';

// auth and session middlerwares
import './util/auth/index.js';
sessionMiddleware(app);
csrfMiddleware(app);
authUserMiddleware(app);

// static middlerwares
imageMiddleware(app);
staticMiddleware(app);

// routesMiddlerware
routerApi(app);

// error handler middlerwares
errorMiddleware(app);

getMongoDbConnection()
  .then(() => app.listen(config.port || 3000))
  .catch((err) => console.log(err));
