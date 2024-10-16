import { unauthorized } from '@hapi/boom';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import sendMail from '../util/mailsender/nodemailer.js';
import config from '../config/config.js';
import UserService from './user.service.js';
const service = new UserService();

class AuthService {
  constructor() {}

  async getUser(email, password) {
    const user = await service.findByEmail(email);

    if (!user) {
      throw unauthorized('Password or email are incorrect');
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw unauthorized('Password or email are incorrect');
    }
    delete user.dataValues.password;
    return user;
  }

  signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role,
    };
    const token = jwt.sign(payload, config.jwtSecretToken, { expiresIn: '1h' });
    return {
      id: user.id,
      displayName: user.displayName,
      email: user.email,
      isEmailverify: user.isEmailVerify,
      token,
    };
  }

  async recoveryPassword(email, origin) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw unauthorized();
    }
    const payload = {
      sub: user.id,
    };
    const token = jwt.sign(payload, config.jwtSecretToken, {
      expiresIn: '5min',
    });
    const link = `${origin}/auth/forgot-password?token=${token}`;
    await service.update(user.id, { recoveryToken: token });
    const emailInfo = {
      from: 'rebel-transport-gr75-api@rebel-transport-gr75.com',
      to: email,
      subject: 'Email to recovery password',
      html: `<b>click this link ${link} to recovery your password</b>`,
    };
    const info = await sendMail(emailInfo);
    return info;
  }

  async isEmailAvailable(email) {
    const user = await service.findByEmail(email);
    return { isAvailable: !user };
  }

  async resetPassword(token, newPassword) {
    try {
      const payload = jwt.verify(token, config.jwtSecretToken);
      const user = await service.findOne(payload.sub);
      if (user.recoveryToken !== token) {
        throw unauthorized();
      }
      const hash = await bcrypt.hash(newPassword, 10);
      await service.update(user.id, { recoveryToken: null, password: hash });
      return { message: 'Password changed' };
    } catch (error) {
      throw unauthorized(error);
    }
  }
}

export default AuthService;
