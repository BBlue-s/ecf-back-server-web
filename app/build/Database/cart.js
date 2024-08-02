"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { DataTypes } = require("sequelize");
const { sequelize } = require("../database");
const Cart = sequelize.define("Cart", {});
module.exports.Cart = Cart;
