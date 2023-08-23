import Joi from 'joi';

const email = Joi.string().email();
const password = Joi.string().min(8);
const token = Joi.string();


const isAvailableEmailDto = Joi.object({
  email: email.required(),
});

const loginDto = Joi.object({
  email: email.required(),
  password: password.required(),
})

const recoveryPasswordDto = Joi.object({
  password: password.required(),
  token: token.required()
})

export { isAvailableEmailDto, loginDto, recoveryPasswordDto };
