'use strict';
const { DataTypes } = require('sequelize');
const { PRODUCT_TABLE } = require('../models/product.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.removeConstraint(
      PRODUCT_TABLE,
      'products_category_id_key'
    );
  },

  async down(queryInterface) {
    await queryInterface.changeColumn(PRODUCT_TABLE, 'category_id', {
      field: 'category_id',
      allowNull: false,
      type: DataTypes.INTEGER,
      unique: true,
    });
  },
};
