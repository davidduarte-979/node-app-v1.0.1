import Joi from 'joi';

const id = Joi.number().integer();
const categoryId = Joi.number().integer();
const name = Joi.string().min(3).max(15);
const description = Joi.string().min(3).max(200);
const price = Joi.number().integer().min(10);
const price_min = Joi.number().integer().min(10);
const price_max = Joi.number().integer().min(10);
const image = Joi.string().uri();

const offset = Joi.number().integer();
const limit = Joi.number().integer();

const createProductDto = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required(),
  description: description.required(),
  categoryId: categoryId.required(),
});

const updateProductDto = Joi.object({
  name,
  price,
  image,
  description,
  categoryId,
});

const getProductDto = Joi.object({
  id: id.required(),
});

const queryProductDto = Joi.object({
  offset,
  limit,
  price,
  price_min,
  price_max: price_max.when('price_min', {
    is: Joi.exist(),
    then: Joi.required(),
  }),
});

export {
  createProductDto,
  updateProductDto,
  getProductDto,
  queryProductDto,
};
