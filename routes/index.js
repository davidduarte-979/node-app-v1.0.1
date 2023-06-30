const express = require('express');
const productsRouter = require('./products.router');
const usersRouter = require('./users.router');
const adminRoutes = require('./admin');
const shopRoutes = require('./shop');
const authRoutes = require('./auth');
const errorController = require('../controllers/error');

const routerApi = (app) => {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use('/users', usersRouter);

  app.use('/admin', adminRoutes);
  app.use(shopRoutes);
  app.use(authRoutes);

  app.get('/500', errorController.get500);
  app.use(errorController.get404);
};

module.exports = routerApi;
