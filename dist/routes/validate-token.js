"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateToken = (req, res, next) => {
    const headerToken = req.headers['authorization'];
    if (headerToken != undefined && headerToken.startsWith("Bearer ")) {
        try {
            const token = headerToken.slice(7);
            jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY || "pepito123");
            next();
        }
        catch (error) {
            return res.status(401).json({
                msg: `Acceso denegado. Token no válido`
            });
        }
    }
    else {
        return res.status(401).json({
            msg: `Acceso denegado`
        });
    }
};
exports.default = validateToken;
