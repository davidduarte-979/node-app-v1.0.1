import { Strategy, ExtractJwt } from 'passport-jwt';
import config from '../../../config/config.js';

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecretToken,
};

const JwtStrategy = new Strategy(options, async (payload, done) => {
  try {
    return done(null, payload);
  } catch (error) {
    done(error, false);
  }
});

export default JwtStrategy;
