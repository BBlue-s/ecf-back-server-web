"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Sequelize, DataTypes } = require("sequelize");
const login = {
    database: "McDonalds",
    username: "marshall",
    password: "marshall"
};
const sequelize = new Sequelize(login.database, login.username, login.password, {
    host: "localhost",
    dialect: "mysql"
});
sequelize
    .authenticate()
    .then(() => console.log("Connexion à la base de donnée McDonalds"))
    .catch((error) => console.log(error));
sequelize.sync({ force: false });
module.exports.sequelize = sequelize;
