const express = require('express');
const app = express();
const config = require('./config/config');

const imageMiddleware = require('./middleware/image.middleware');
const staticMiddleware = require('./middleware/static.middleware');
const csrfMiddleware = require('./middleware/csrf.middleware');
const sessionMiddleware = require('./middleware/session.middleware');
const authUserMiddleware = require('./middleware/auth-user.middleware');
const errorMiddleware = require('./middleware/error.middleware');

const routerApi = require('./routes');
const getMongoDbConnection = require('./libs/mongoose');

// auth and session middlerwares
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
