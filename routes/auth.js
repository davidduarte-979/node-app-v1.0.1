import { Router } from 'express';
import { check, body } from 'express-validator/check/index.js';

import { getLogin, getSignup, postLogin, postSignup, postLogout, getReset, postReset, getNewPassword, postNewPassword } from '../controllers/auth.js';
import userModel from '../models/user.js';

const router = Router();

router.get('/login', getLogin);

router.get('/signup', getSignup);

router.post(
  '/login',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email address.')
      .normalizeEmail(),
    body('password', 'Password has to be valid.')
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim(),
  ],
  postLogin
);

router.post(
  '/signup',
  [
    check('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom((value) => {
        return userModel.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject(
              'E-Mail exists already, please pick a different one.'
            );
          }
        });
      })
      .normalizeEmail(),
    body(
      'password',
      'Please enter a password with only numbers and text and at least 5 characters.'
    )
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim(),
    body('confirmPassword')
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Passwords have to match!');
        }
        return true;
      }),
  ],
  postSignup
);

router.post('/logout', postLogout);

router.get('/reset', getReset);

router.post('/reset', postReset);

router.get('/reset/:token', getNewPassword);

router.post('/new-password', postNewPassword);

export default router;
