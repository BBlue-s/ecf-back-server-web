"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { DataTypes } = require("sequelize");
const { sequelize } = require("../database");
const bcrypt = require("bcrypt");
const { Cart } = require("./Cart");
const saltRounds = 10;
const User = sequelize.define("User", {
    name: DataTypes.TEXT,
    email: DataTypes.TEXT,
    password: {
        type: DataTypes.TEXT,
        set(value) {
            this.setDataValue('password', bcrypt.hashSync(value, saltRounds));
        }
    }
});
Cart.belongsTo(User, {
    foreignKey: {
        unique: true
    }
});
User.hasOne(Cart);
module.exports.User = User;
