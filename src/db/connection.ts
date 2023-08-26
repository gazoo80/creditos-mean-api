
import { Sequelize } from "sequelize";

const host: string = process.env.HOST || "localhost"
const database: string = process.env.DATABASE || "api"
const username: string = process.env.USERNAME || "root"
const password: string = process.env.PASSWORD || "admin"

const sequelize = new Sequelize(database, username, password, {
    host: host,
    dialect: "mysql"
});

export default sequelize;