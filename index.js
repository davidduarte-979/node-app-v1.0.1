import express from 'express';
import cors from 'cors';
import config from './config/config.js';

import imageMiddleware from './middleware/image.middleware.js';
import staticMiddleware from './middleware/static.middleware.js';
import csrfMiddleware from './middleware/csrf.middleware.js';
import sessionMiddleware from './middleware/session.middleware.js';
import authUserMiddleware from './middleware/auth-user.middleware.js';
import errorMiddleware from './middleware/error.middleware.js';

import routerApi from './routes/index.js';
import getMongoDbConnection from './libs/mongoose.js';
// Init server
const app = express();

app.options('*', cors());
app.use(
  cors({
    origin: '*',
    headers: ['Content-Type'],
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT'],
    credentials: true,
  })
);

app.use(function (req, res, next) {
  // res.header("Access-Control-Allow-Origin", "*");
  const allowedOrigins = [
    'http://localhost:4200',
    'https://www.davidduarte.dev',
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.header('Access-Control-Allow-credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, UPDATE');
  next();
});

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
