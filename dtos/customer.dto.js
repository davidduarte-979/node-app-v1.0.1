import Joi from 'joi';

const id = Joi.number().integer();
const name = Joi.string().min(3).max(15);
const lastName = Joi.string().min(3).max(15);
const phone = Joi.string();
const email = Joi.string().email();
const password = Joi.string();
const userId = Joi.number().integer();

const createCustomerDto = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phone: phone.required(),
  user: Joi.object({
    email: email.required(),
    password: password.required(),
  }),
});

const updateCustomerDto = Joi.object({
  name,
  lastName,
  phone,
  userId,
  user: {
    email,
    password,
  },
});

const getCustomerDto = Joi.object({
  id: id.required(),
});

export { createCustomerDto, updateCustomerDto, getCustomerDto };
