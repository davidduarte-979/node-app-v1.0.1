const express = require('express');
const OrdersService = require('../services/order.service');
const validatorMiddleware = require('../middleware/validator.middleware');
const {
  getOrderDto,
  createOrderDto,
  updateOrderDto,
  addItemDto,
} = require('../dtos/order.dto');
const router = express.Router();
const service = new OrdersService();

router.get('/', async (req, res, next) => {
  try {
    res.json(await service.find());
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorMiddleware(getOrderDto, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      return res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorMiddleware(createOrderDto, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newProduct = await service.create(body);
      return res.status(201).json({
        message: 'created!',
        data: newProduct,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  validatorMiddleware(getOrderDto, 'params'),
  validatorMiddleware(updateOrderDto, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const { id } = req.params;
      const updatedOrder = await service.update(id, body);
      return res.json(updatedOrder);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  validatorMiddleware(getOrderDto, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const orderId = await service.delete(id);
      return res.json({
        message: 'delete!!',
        orderId,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/add-item',
  validatorMiddleware(addItemDto, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newItem = await service.addItem(body);
      return res.status(201).json({
        message: 'created!',
        data: newItem,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
