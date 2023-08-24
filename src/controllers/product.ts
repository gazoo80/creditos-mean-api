import { Request, Response } from "express";
import { Product } from '../models/product';

export const getProducts = async (req: Request, res:Response) => {

    const products = await Product.findAll();

    res.json(products);
}