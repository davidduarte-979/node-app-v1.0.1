import { Router } from 'express';
import productsRouter from './products.router.js';
import customersRouter from './customer.router.js';
import categoriesRouter from './categories.router.js';
import authRouter from './auth.router.js';
import ordersRouter from './orders.router.js';
import usersRouter from './users.router.js';
import adminRoutes from './admin.js';
import shopRoutes from './shop.js';
import authRoutes from './auth.js';
import { get500, get404 } from '../controllers/error.js';

const routerApi = (app) => {
  const router = Router();
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use('/users', usersRouter);
  router.use('/customers', customersRouter);
  router.use('/categories', categoriesRouter);
  router.use('/orders', ordersRouter);
  router.use('/auth', authRouter);

  app.use('/admin', adminRoutes);
  app.use(shopRoutes);
  app.use(authRoutes);

  app.get('/500', get500);
  app.use(get404);
};

export default routerApi;
