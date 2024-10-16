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

const allowlist = ['https://www.davidduarte.dev', 'http://localhost:4200'];
const corsOptionsDelegate = function (req, callback) {
  let corsOptions;
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

// Init server
const app = express();
app.use(cors(corsOptionsDelegate));
// Add headers
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'https://www.davidduarte.dev');
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

  // Request methods you wish to allow
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );

  // Request headers you wish to allow
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
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
