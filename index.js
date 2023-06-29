require('dotenv').config();
const express = require('express');
const app = express();

const imageMiddleware = require('./middleware/image.middleware');
const staticMiddleware = require('./middleware/static.middleware');
const csrfMiddleware = require('./middleware/csrf.middleware');
const sessionMiddleware = require('./middleware/session.middleware');
const authUserMiddleware = require('./middleware/auth-user.middleware');
const routerApi = require('./routes');
const errorMiddleware = require('./middleware/error.middleware');

const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGO_URI;

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

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(process.env.PORT || 3000))
  .catch((err) => console.log(err));
