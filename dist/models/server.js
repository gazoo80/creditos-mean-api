"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const product_1 = __importDefault(require("../routes/product"));
const user_1 = __importDefault(require("../routes/user"));
const customer_1 = __importDefault(require("../routes/customer"));
const product_2 = require("./product");
const user_2 = require("./user");
const customer_2 = require("./customer");
class Server {
    constructor() {
        // Creamos el servidor express
        this.app = (0, express_1.default)();
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
        this.app.use("/api/products", product_1.default);
        this.app.use("/api/users", user_1.default);
        this.app.use("/api/customers", customer_1.default);
    }
    middlewares() {
        // parseo del body
        this.app.use(express_1.default.json());
        // Configuracion de CORS
        this.app.use((0, cors_1.default)());
    }
    createTablesDB() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Con sync() creamos la tabla si no existe
                yield product_2.Product.sync();
                yield user_2.User.sync();
                yield customer_2.Customer.sync();
                console.log("Tablas creadas");
            }
            catch (error) {
                console.error('Unable to connect to the database:', error);
            }
        });
    }
}
exports.default = Server; // No seran neceasrias las llaves en la importacion
