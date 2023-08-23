import { Router } from 'express';
import passport from 'passport';
import validatorMiddleware from '../middleware/validator.middleware.js';
import AuthService from '../services/auth.service.js';
import { isAvailableEmailDto, loginDto, recoveryPasswordDto } from "../dtos/auth.dto.js";

const router = Router();

const service = new AuthService();

router.post(
  '/login',
  validatorMiddleware(loginDto, 'body'),
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

router.post(
  '/is-email-available',
  validatorMiddleware(isAvailableEmailDto, 'body'),
  async (req, res, next) => {
    try {
      const email = req.body.email;
      res.status(201).json(await service.isEmailAvailable(email));
    } catch (error) {
      next(error);
    }
  }
);

router.post('/recovery', validatorMiddleware(isAvailableEmailDto, 'body'), async (req, res, next) => {
  try {
    const { email } = req.body;
    const origin = req.get('origin');
    const rta = await service.recoveryPassword(email, origin);
    res.status(201).json({ rta, message: 'Email sent' });
  } catch (error) {
    next(error);
  }
});

router.post('/reset-password', validatorMiddleware(recoveryPasswordDto, 'body'), async (req, res, next) => {
  try {
    const { token, password } = req.body;
    const rta = await service.resetPassword(token, password);
    res.status(201).json({ rta });
  } catch (error) {
    next(error);
  }
});

export default router;
