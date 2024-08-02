"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { DataTypes } = require("sequelize");
const { sequelize } = require("../database");
const Product = sequelize.define("Product", {
    name: DataTypes.TEXT,
    description: DataTypes.TEXT,
    price: DataTypes.FLOAT
});
module.exports.Product = Product;
