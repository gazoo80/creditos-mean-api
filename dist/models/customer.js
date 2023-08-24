"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customer = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
// user es el nombre del modelo que sera usado por sequelize para crear el nombre de
// la tabla, incluyendole la letra "s", es decir "users". Podemos agregar un tercer parametro
// al metodo define(), que serian opciones como por ejemplo que no nos cree las columnas 
// de auditoria createdAt u updateAt
// { createdAt: false, updateAt: false }
exports.Customer = connection_1.default.define("customer", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    telephone: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    idCardType: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    idCardNumber: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    dateOfBirth: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    rating: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    photo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    latitude: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    longitude: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    }
});
