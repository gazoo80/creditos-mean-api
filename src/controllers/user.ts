import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IUser, User } from "../models/user";
import env  from "dotenv";

export const createUser= async (req: Request, res:Response) => {

    const { username, password } = req.body;

    // Validamos si el usuario ya existe en la BD,
    const userDB = await User.findOne({ where: { username: username }});

    if (userDB) {
        // return para que no continue la ejecucion
        return res.status(400).json({
            msg: `Ya existe un usuario con el nombre de usuario ${username}`
        });
    }

    // Encriptamos el passxord
    const hashPassword = await bcrypt.hash(password, 10);

    try {
        // Guardando en la BD
        await User.create({
            username: username,
            password: hashPassword
        });
        
        // Respuesta al usuario en caso de exito
        res.json({
            msg: `Usuario ${username} creado exitosamente`
        });
    } catch (error) {
        // Respuesta al usuario en cado de erroe
        res.status(500).json({
            msg: "Opps, ocurrió un error",
            error
        });
    }  
}

export const loginUser= async (req: Request, res:Response) => {

    const { username, password } = req.body;

    // Validamos si el usuario existe en la BD,
    const userDB: IUser = await User.findOne<any>({ where: { username: username }});

    if (!userDB) {
        // return para que no continue la ejecucion
        return res.status(400).json({
            msg: `El usuario ${username} no está registrado`
        });
    }

    // Validamos que el password es correcto para el ususario que ya sé que existe
    const passValid: boolean = await bcrypt.compare(password, userDB.password);

    // Si el password no es valido
    if (!passValid) {
        return res.status(400).json({
            msg: `Las credenciales de usuario son incorrectas`
        });
    }

    // Si las credenciales son correctas, generamos el web token para el usuario
    const token: string = jwt.sign(
        {
            username: username
        }, 
        process.env.SECRET_KEY || "pepito123",
        // {
        //     expiresIn: "20000" // En milisegundos
        // }
    );

    res.json({
        msg: "El usuario ha iniciado sesión",
        token
    });
}