
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
        // Creamos el servidor express
        this.app = express();
        
        this.port = process.env.PORT || "3001";

        // Levantando el servidor en el puerto correspondiente
        this.listen();

        // Creando las tablas que aun no han sido creadas en la BD
        this.createTablesDB();

        // Para poder parsear el body en las peticiones POST.
        // Es importante que este en esta posicion
        this.middlewares();

        // Inicializamos las rutas
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
        // parseo del body
        this.app.use(express.json());

        // Configuracion de CORS
        this.app.use(cors());
    }

    async createTablesDB() {
        try {
            // Con sync() creamos la tabla si no existe
            await Product.sync();
            await User.sync();
            await Customer.sync();
            console.log("Tablas creadas");
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }
}

export default Server // No seran neceasrias las llaves en la importacion