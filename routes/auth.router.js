const express = require('express');
const passport = require('passport');
const AuthService = require('../services/auth.service');

const router = express.Router();

const service = new AuthService();

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      res.status(201).json(await service.signToken(user));
    } catch (error) {
      next(error);
    }
  }
);

router.post('/recovery', async (req, res, next) => {
  try {
    const { email } = req.body;
    const rta = await service.recoveryPassword(email);
    res.status(201).json({ rta, message: 'Email sent' });
  } catch (error) {
    next(error);
  }
});

router.post('/reset-password', async (req, res, next) => {
  try {
    const { token, newPassword } = req.body;
    const rta = await service.resetPassword(token, newPassword);
    res.status(201).json({ rta, message: 'Email sent' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
