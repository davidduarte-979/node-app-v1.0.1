const boom = require('@hapi/boom');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { sendMail } = require('../util/mailsender/nodemailer');
const { jwtSecretToken } = require('../config/config');
const UserService = require('./user.service');
const service = new UserService();

class AuthService {
  constructor() {}

  async getUser(email, password) {
    const user = await service.findByEmail(email);
    const isMatch = await bcrypt.compare(password, user.password);

    if (!user || !isMatch) {
      throw boom.unauthorized();
    }
    delete user.dataValues.password;
    return user;
  }

  signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role,
    };
    const token = jwt.sign(payload, jwtSecretToken);
    return {
      user,
      token,
    };
  }

  async recoveryPassword(email) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const payload = {
      sub: user.id,
    };
    const token = jwt.sign(payload, jwtSecretToken, { expiresIn: '15min' });
    const link = `http/myfrontend/recovery?token=${token}`;
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

  async resetPassword(token, newPassword) {
    try {
      const payload = jwt.verify(token, jwtSecretToken);
      const user = await service.findOne(payload.sub);
      if (user.recoveryToken !== token) {
        throw boom.unauthorized();
      }
      const hash = await bcrypt.hash(newPassword, 10);
      await service.update(user.id, { recoveryToken: null, password: hash });
      return { message: 'Password changed' };
    } catch (error) {
      throw boom.unauthorized(error);
    }
  }
}

module.exports = AuthService;
