import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IUser, User } from "../models/user";
import env  from "dotenv";

export const createUser= async (req: Request, res:Response) => {

    const { username, password } = req.body;

    const userDB = await User.findOne({ where: { username: username }});

    if (userDB) {
        return res.status(400).json({
            msg: `Ya existe un usuario con el nombre de usuario ${username}`
        });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    try {
        await User.create({
            username: username,
            password: hashPassword
        });
        
        res.json({
            msg: `Usuario ${username} creado exitosamente`
        });
    } catch (error) {
        res.status(500).json({
            msg: "Opps, ocurrió un error",
            error
        });
    }  
}

export const loginUser= async (req: Request, res:Response) => {

    const { username, password } = req.body;

    const userDB: IUser = await User.findOne<any>({ where: { username: username }});

    if (!userDB) {
        return res.status(400).json({
            msg: `El usuario ${username} no está registrado`
        });
    }

    const passValid: boolean = await bcrypt.compare(password, userDB.password);

    if (!passValid) {
        return res.status(400).json({
            msg: `Las credenciales de usuario son incorrectas`
        });
    }

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