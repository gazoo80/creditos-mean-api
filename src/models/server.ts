
import express, { Application } from "express";
import sequelize from "../db/connection";
import cors from "cors";
import routeProduct from "../routes/product";
import routeUser from "../routes/user";
import routeCustomer from "../routes/customer";
import { Product } from "./product";
import { User } from "./user";
import { Customer } from "./customer";

class Server {

    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        
        this.port = process.env.PORT || "3001";

        this.listen();

        this.createTablesDB();

        this.middlewares();

        this.routes();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Aplicacion corriendo en el puerto " + this.port);
        });
    }

    routes() {
        this.app.use("/api/products", routeProduct);
        this.app.use("/api/users", routeUser);
        this.app.use("/api/customers", routeCustomer);
    }

    middlewares() {
        this.app.use(express.json());
        this.app.use(cors());
    }

    async createTablesDB() {
        try {
            await Product.sync();
            await User.sync();
            await Customer.sync();
            console.log("Tablas creadas");
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }
}

export default Server