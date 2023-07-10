const express = require('express');
const passport = require('passport');
const CategoryService = require('../services/category.service');
const validatorMiddleware = require('../middleware/validator.middleware');
const { checkRoles } = require('../middleware/auth.middleware');
const {
  getCategoryDto,
  createCategoryDto,
  updateCategoryDto,
} = require('../dtos/category.dto');
const router = express.Router();
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

module.exports = router;
