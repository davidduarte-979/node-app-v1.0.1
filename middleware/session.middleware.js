const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const MONGODB_URI = process.env.MONGO_URI;
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions',
});

const sessionMiddleware = (app) => {
  app.use(cors());
  app.use(helmet());
  app.use(
    session({
      secret: 'my secret',
      resave: false,
      saveUninitialized: false,
      store,
    })
  );
};

module.exports = sessionMiddleware;
