"use strict";
const { DataTypes, Sequelize } = require("sequelize");
const ORDER_TABLE = "orders";
const CUSTOMER_TABLE = "customers";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(ORDER_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      customerId: {
        field: "customer_id",
        allowNull: false,
        type: DataTypes.INTEGER,
        References: {
          model: CUSTOMER_TABLE,
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: "created_at",
        defaultValue: Sequelize.NOW,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable(ORDER_TABLE);
  },
};
