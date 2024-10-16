'use strict';
const { DataTypes, Sequelize } = require('sequelize');

const USER_TABLE = 'users';
const userSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  firstname: {
    allowNull: true,
    type: DataTypes.STRING
  },
  lastname: {
    allowNull: true,
    type: DataTypes.STRING
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  recoveryToken: {
    field: 'recovery_token',
    allowNull: true,
    type: DataTypes.STRING,
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'customer',
  },
  isEmailVerify: {
    field: 'is_email_verify',
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  displayName: {
    type: DataTypes.VIRTUAL,
    get() {
      return `${this.firstname} ${this.lastname}`
    },
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {

  async up(queryInterface) {
    await queryInterface.addColumn(USER_TABLE, 'role', userSchema.role);
  },

  async down(queryInterface) {
    await queryInterface.removeColumn(USER_TABLE, 'role');
  }
}
