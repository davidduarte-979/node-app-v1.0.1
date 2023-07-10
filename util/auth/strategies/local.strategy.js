const { Strategy } = require('passport-local');
const AuthService = require('../../../services/auth.service');

const options = {
  usernameField: 'email',
  passwordField: 'password',
};
const LocalStrategy = new Strategy(options, async (email, password, done) => {
  try {
    const service = new AuthService();
    const user = await service.getUser(email, password);
    done(null, user);
  } catch (error) {
    done(error, false);
  }
});

module.exports = LocalStrategy;
