"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { DataTypes } = require("sequelize");
const { sequelize } = require("../database");
const { User } = require("./User");
const Role = sequelize.define("Role", {
    name: DataTypes.TEXT,
    importance: DataTypes.INTEGER
});
User.belongsTo(Role);
Role.hasMany(User);
module.exports.Role = Role;
