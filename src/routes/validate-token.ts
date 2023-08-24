import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const validateToken = (req: Request, res: Response, next: NextFunction) => {

    // Obtenemos el bearer token del encabezado authorization
    const headerToken = req.headers['authorization'];
    console.log(headerToken);

    // Si el headerToken exsite y es del tipo Bearer
    if (headerToken != undefined && headerToken.startsWith("Bearer ")) {

        try {
            // Extraemos solo el token
            const token = headerToken.slice(7);

            // Validamos si el token es valido (no este corrupto, expirado, etc.)
            jwt.verify(token, process.env.SECRET_KEY || "pepito123")

            // Nos movemos a la sgte instruccion qeu es mostrar los prodluctos
            next();
        } catch (error) {
            // Si se trata de un token no válido
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