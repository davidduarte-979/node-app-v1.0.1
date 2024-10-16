'use strict';
const { DataTypes } = require('sequelize');
const CUSTOMER_TABLE = 'customers';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.changeColumn(CUSTOMER_TABLE, 'user_id', {
      field: 'user_id',
      allowNull: false,
      type: DataTypes.INTEGER,
      unique: true,
    });
  },

  async down(queryInterface) {
    await queryInterface.removeConstraint(
      CUSTOMER_TABLE,
      'customers_user_id_key'
    );
  },
};
