'use strict';
const { DataTypes } = require('sequelize');
const USER_TABLE = "users"

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.addColumn(USER_TABLE, 'is_email_verify', {
      field: 'is_email_verify',
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    })
  },

  async down (queryInterface) {
    await queryInterface.removeColumn(USER_TABLE, 'is_email_verify')
  }
};
