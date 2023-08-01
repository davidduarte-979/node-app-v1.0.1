import { Router } from 'express';

import CustomerService from '../services/customer.service.js';
import validationHandler from '../middleware/validator.middleware.js';
import { createCustomerDto, getCustomerDto, updateCustomerDto } from '../dtos/customer.dto.js';

const router = Router();
const service = new CustomerService();

router.get('/', async (req, res, next) => {
  try {
    res.json(await service.find());
  } catch (error) {
    next(error);
  }
});

router.post(
  '/',
  validationHandler(createCustomerDto, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      res.status(201).json(await service.create(body));
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  validationHandler(getCustomerDto, 'params'),
  validationHandler(updateCustomerDto, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      res.status(201).json(await service.update(id, body));
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  validationHandler(getCustomerDto, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      res.status(200).json(await service.delete(id));
    } catch (error) {
      next(error);
    }
  }
);

export default router;
