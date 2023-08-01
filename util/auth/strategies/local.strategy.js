import { Strategy } from 'passport-local';
import AuthService from '../../../services/auth.service.js';

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

export default LocalStrategy;
