
import { DataTypes } from "sequelize";
import sequelize from "../db/connection";

export const Customer = sequelize.define("customer", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telephone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    idCardType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    idCardNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dateOfBirth: {
        type: DataTypes.DATE,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    photo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    latitude: {
        type: DataTypes.STRING,
        allowNull: true
    },
    longitude: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

export interface ICustomer {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    telephone: string;
    idCardType: string;
    idCardNumber: string;
    dateOfBirth: Date;
    address: string;
    rating: number;
    photo: string;
    latitude: string;
    longitude: string;
}
