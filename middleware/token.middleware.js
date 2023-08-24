import { forbidden } from '@hapi/boom';
import jwt from 'jsonwebtoken';
import config from '../config/config.js';

const tokenValidator = (req, res, next) => {
  const token = req.headers['authorization'].split(' ')[1];
  if (token) {
    const payload = jwt.verify(token, config.jwtSecretToken);
    req.user = payload;
    next()
  } else {
    next(forbidden());
  }
}

export { tokenValidator }