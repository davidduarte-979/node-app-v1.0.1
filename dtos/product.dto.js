const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10);
const image = Joi.string().uri();

const createProductDto = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required(),
});

const updateProductDto = Joi.object({
  name,
  price,
  image,
});

const getProductDto = Joi.object({
  id: id.required(),
});

module.exports = { createProductDto, updateProductDto, getProductDto };
