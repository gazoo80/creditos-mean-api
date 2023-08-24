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
exports.loginUser = exports.createUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../models/user");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    // Validamos si el usuario ya existe en la BD,
    const userDB = yield user_1.User.findOne({ where: { username: username } });
    if (userDB) {
        // return para que no continue la ejecucion
        return res.status(400).json({
            msg: `Ya existe un usuario con el nombre de usuario ${username}`
        });
    }
    // Encriptamos el passxord
    const hashPassword = yield bcrypt_1.default.hash(password, 10);
    try {
        // Guardando en la BD
        yield user_1.User.create({
            username: username,
            password: hashPassword
        });
        // Respuesta al usuario en caso de exito
        res.json({
            msg: `Usuario ${username} creado exitosamente`
        });
    }
    catch (error) {
        // Respuesta al usuario en cado de erroe
        res.status(500).json({
            msg: "Opps, ocurrió un error",
            error
        });
    }
});
exports.createUser = createUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    // Validamos si el usuario existe en la BD,
    const userDB = yield user_1.User.findOne({ where: { username: username } });
    if (!userDB) {
        // return para que no continue la ejecucion
        return res.status(400).json({
            msg: `El usuario ${username} no está registrado`
        });
    }
    // Validamos que el password es correcto para el ususario que ya sé que existe
    const passValid = yield bcrypt_1.default.compare(password, userDB.password);
    // Si el password no es valido
    if (!passValid) {
        return res.status(400).json({
            msg: `Las credenciales de usuario son incorrectas`
        });
    }
    // Si las credenciales son correctas, generamos el web token para el usuario
    const token = jsonwebtoken_1.default.sign({
        username: username
    }, process.env.SECRET_KEY || "pepito123");
    res.json({
        msg: "El usuario ha iniciado sesión",
        token
    });
});
exports.loginUser = loginUser;
