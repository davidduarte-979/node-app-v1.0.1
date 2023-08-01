import { Router } from 'express';
import ProductsService from '../services/product.service.js';
import validatorMiddleware from '../middleware/validator.middleware.js';
import { getProductDto, createProductDto, updateProductDto, queryProductDto } from '../dtos/product.dto.js';
const router = Router();
const service = new ProductsService();

router.get(
  '/',
  validatorMiddleware(queryProductDto, 'query'),
  async (req, res, next) => {
    try {
      const products = await service.find(req.query);
      return res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/:id',
  validatorMiddleware(getProductDto, 'params'),
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
  validatorMiddleware(createProductDto, 'body'),
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
  validatorMiddleware(getProductDto, 'params'),
  validatorMiddleware(updateProductDto, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const { id } = req.params;
      const updatedProduct = await service.update(id, body);
      return res.json(updatedProduct);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  validatorMiddleware(getProductDto, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const productId = await service.delete(id);
      return res.json({
        message: 'delete!!',
        productId,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
