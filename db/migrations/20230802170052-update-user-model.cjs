'use strict';
const { DataTypes } = require('sequelize');
const USER_TABLE = "users"

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.addColumn(USER_TABLE, 'firstname', {
      allowNull: true,
      type: DataTypes.STRING
    });
    await queryInterface.addColumn(USER_TABLE, 'lastname', {
      allowNull: true,
      type: DataTypes.STRING
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(USER_TABLE, 'firstname');
    await queryInterface.removeColumn(USER_TABLE, 'lastname');
  }
};
