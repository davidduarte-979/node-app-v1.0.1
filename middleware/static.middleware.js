import { json } from 'express';
import bodyParse from 'body-parser';
import compression from 'compression';
import morgan from 'morgan';

const { urlencoded } = bodyParse;

const staticMiddleware = (app) => {
  app.set('view engine', 'ejs');
  app.set('views', 'views');
  app.use(urlencoded({ extended: false }));
  app.use(morgan('short'));
  app.use(json());
  app.use(compression());
};

export default staticMiddleware;
