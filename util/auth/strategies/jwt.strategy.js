const { Strategy, ExtractJwt } = require('passport-jwt');
const { jwtSecretToken } = require('../../../config/config');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecretToken,
};

const JwtStrategy = new Strategy(options, async (payload, done) => {
  try {
    return done(null, payload);
  } catch (error) {
    done(error, false);
  }
});

module.exports = JwtStrategy;
