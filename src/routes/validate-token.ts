import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const validateToken = (req: Request, res: Response, next: NextFunction) => {

    const headerToken = req.headers['authorization'];

    if (headerToken != undefined && headerToken.startsWith("Bearer ")) {

        try {
            const token = headerToken.slice(7);

            jwt.verify(token, process.env.SECRET_KEY || "pepito123")

            next();
        } catch (error) {
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
}

export default validateToken;