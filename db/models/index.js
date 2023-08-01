import { userSchema, User } from './user.model.js';
import { CustomerSchema, Customer } from './customer.model.js';
import { ProductSchema, Product } from './product.model.js';
import { CategorySchema, Category } from './categoy.model.js';
import { OrderProductSchema, OrderProduct } from './order-product.model.js';
import { OrderSchema, Order } from './order.model.js';

const setupModels = (sequelize) => {
  User.init(userSchema, User.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));
  Order.init(OrderSchema, Order.config(sequelize));
  OrderProduct.init(OrderProductSchema, OrderProduct.config(sequelize));

  User.associate(sequelize.models);
  Customer.associate(sequelize.models);
  Category.associate(sequelize.models);
  Product.associate(sequelize.models);
  Order.associate(sequelize.models);
};

export default setupModels;
