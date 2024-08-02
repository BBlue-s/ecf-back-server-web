"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { DataTypes } = require("sequelize");
const { sequelize } = require("../database");
const { Cart } = require("./cart");
const Order = sequelize.define("Order", {
    date: DataTypes.DATE,
    validation: DataTypes.BOOLEAN,
});
Order.belongsTo(Cart);
Cart.hasMany(Order);
module.exports.Order = Order;
