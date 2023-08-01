import Joi from 'joi';

const id = Joi.number().integer();
const customerId = Joi.number().integer();
const orderId = Joi.number().integer();
const productId = Joi.number().integer();
const amount = Joi.number().integer().min(1);

const createOrderDto = Joi.object({
  customerId: customerId.required(),
});

const updateOrderDto = Joi.object({
  customerId,
});

const getOrderDto = Joi.object({
  id: id.required(),
});

const addItemDto = Joi.object({
  orderId: orderId.required(),
  productId: productId.required(),
  amount: amount.required(),
});

export { createOrderDto, updateOrderDto, getOrderDto, addItemDto };
