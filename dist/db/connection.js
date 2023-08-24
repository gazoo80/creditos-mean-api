"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize("sql10638850", "sql10638850", "vYbjgg4Qlj", {
    host: "sql10.freesqldatabase.com",
    dialect: "mysql"
});
exports.default = sequelize;
