"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const host = process.env.HOST || "localhost";
const database = process.env.DATABASE || "api";
const username = process.env.USERNAME || "root";
const password = process.env.PASSWORD || "admin";
const sequelize = new sequelize_1.Sequelize(database, username, password, {
    host: host,
    dialect: "mysql"
});
exports.default = sequelize;
