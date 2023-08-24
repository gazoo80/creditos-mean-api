import { Request, Response } from "express";
import { Customer } from "../models/customer";

export const getCustomers = async (req: Request, res: Response) => {

    const customers = await Customer.findAll();
    res.json(customers);
};

export const getCustomer = async (req: Request, res: Response) => {

    console.log(req.params.id);

    const { id } = req.params;

    const customer = await Customer.findByPk(id);

    if (!customer) {
        return res.status(404).json({
            msg: "El cliente solicitado no existe"
        });
    }

    res.json(customer);
};

export const deleteCustomer = async (req: Request, res: Response) => {

    console.log(req.params.id);

    const { id } = req.params;

    const customer = await Customer.findByPk(id);

    if (!customer) {
        return res.status(404).json({
            msg: "El cliente que desea eliminar no existe"
        });
    }

    await customer.destroy();

    res.json({
        msg: "El cliente fue eliminado con éxito",
    });
};

export const createCustomer = async (req: Request, res: Response) => {

    console.log(req.body);

    const { body } = req;

    try {
        await Customer.create(body);

        res.json({
            msg: "El cliente fue agregado con éxito",
            customer: body
        });
    } catch (error) {
        res.status(500).json({
            msg: "Ocurrió un error inesperado. Inténtelo más tarde"
        });
    } 
};

export const updateCustomer = async (req: Request, res: Response) => {

    const { body } = req;
    const { id } = req.params;

    console.log(body);
    console.log(id);

    try {
        const customer = await Customer.findByPk(id);

        if (!customer) {
            return res.status(404).json({
                msg: "El cliente que desea actualizar no existe"
            });
        }

        await customer.update(body);

        res.json({
            msg: "El cliente fue actualizado con éxito",
            id,
            customer: body
        });
    } catch (error) {
        res.status(500).json({
            msg: "Ocurrió un error inesperado. Inténtelo más tarde"
        });
    }
};