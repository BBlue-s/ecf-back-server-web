"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { DataTypes } = require("sequelize");
const { sequelize } = require("../database");
const { Product } = require("./Product");
const Category = sequelize.define("Category", {
    name: DataTypes.TEXT
});
Product.belongsTo(Category);
Category.hasMany(Product);
module.exports.Category = Category;
