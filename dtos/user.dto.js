import Joi from 'joi';

const id = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string().min(8);
const firstname = Joi.string().max(10);
const lastname = Joi.string().max(10);
const role = Joi.string().min(5);

const createUserDto = Joi.object({
  email: email.required(),
  password: password.required(),
  firstname: firstname.required(),
  lastname: lastname.required(),
  role,
});

const updateUserDto = Joi.object({
  lastname,
  firstname,
  email,
  role,
});

const getUserDto = Joi.object({
  id: id.required(),
});

export { createUserDto, updateUserDto, getUserDto };
