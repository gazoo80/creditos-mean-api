
import { DataTypes } from "sequelize";
import sequelize from "../db/connection";

// producr es el nombre del modelo que sera usado por sequelize para crear el nombre de
// la tabla, incluyendole la letar "s", es decir "products"
export const Product = sequelize.define("product", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
    descripcion: {
        type: DataTypes.STRING
    }
});