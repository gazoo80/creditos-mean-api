
import { DataTypes } from "sequelize";
import sequelize from "../db/connection";

// user es el nombre del modelo que sera usado por sequelize para crear el nombre de
// la tabla, incluyendole la letra "s", es decir "users"
export const User = sequelize.define("user", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export interface IUser {
    username: string,
    password: string
}