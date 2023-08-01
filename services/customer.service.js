import sequilizeLib from '../libs/sequelize.js';
import { notFound } from '@hapi/boom';
import bcryptjs from 'bcryptjs';
const { models } = sequilizeLib;

class CustomerService {
  constructor() {}

  async find() {
    const rta = await models.Customer.findAll({
      include: ['user'],
    });
    return rta;
  }

  async findOne(id) {
    const user = await models.Customer.findByPk(id);
    if (!user) {
      throw notFound('Customer not found');
    }
    return user;
  }

  async create(data) {
    const hash = await bcryptjs.hash(data.user.password, 10);
    const newData = {
      ...data,
      user: {
        ...data.user,
        password: hash,
      },
    };
    const newCustomer = await models.Customer.create(newData, {
      include: ['user'],
    });
    delete newCustomer.dataValues.user.dataValues.password;
    return newCustomer;
  }

  async update(id, data) {
    const model = await this.findOne(id);
    const rta = await model.update(data);
    return rta;
  }

  async delete(id) {
    const model = await this.findOne(id);
    await model.destroy();
    return { id };
  }
}

export default CustomerService;
