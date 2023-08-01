import { Router } from 'express';
import passport from 'passport';
import CategoryService from '../services/category.service.js';
import validatorMiddleware from '../middleware/validator.middleware.js';
import { checkRoles } from '../middleware/auth.middleware.js';
import { getCategoryDto, createCategoryDto, updateCategoryDto } from '../dtos/category.dto.js';
const router = Router();
const service = new CategoryService();

router.get('/', async (req, res, next) => {
  try {
    const categories = await service.find();
    return res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorMiddleware(getCategoryDto, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await service.findOne(id);
      return res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'seller'),
  validatorMiddleware(createCategoryDto, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCategory = await service.create(body);
      return res.status(201).json({
        message: 'created!',
        data: newCategory,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  validatorMiddleware(getCategoryDto, 'params'),
  validatorMiddleware(updateCategoryDto, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const { id } = req.params;
      const updatedCategory = await service.update(id, body);
      return res.json(updatedCategory);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  validatorMiddleware(getCategoryDto, 'params'),
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
