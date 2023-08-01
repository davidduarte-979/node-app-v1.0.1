import helmet from 'helmet';
import cors from 'cors';
import session from 'express-session';
import connectMongodbSession from 'connect-mongodb-session';
const MongoDBStore = connectMongodbSession(session);
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

export default sessionMiddleware;
