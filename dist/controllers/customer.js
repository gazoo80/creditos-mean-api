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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCustomer = exports.createCustomer = exports.deleteCustomer = exports.getCustomer = exports.getCustomers = void 0;
const customer_1 = require("../models/customer");
const getCustomers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const customers = yield customer_1.Customer.findAll();
    res.json(customers);
});
exports.getCustomers = getCustomers;
const getCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params.id);
    const { id } = req.params;
    const customer = yield customer_1.Customer.findByPk(id);
    if (!customer) {
        return res.status(404).json({
            msg: "El cliente solicitado no existe"
        });
    }
    res.json(customer);
});
exports.getCustomer = getCustomer;
const deleteCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params.id);
    const { id } = req.params;
    const customer = yield customer_1.Customer.findByPk(id);
    if (!customer) {
        return res.status(404).json({
            msg: "El cliente que desea eliminar no existe"
        });
    }
    yield customer.destroy();
    res.json({
        msg: "El cliente fue eliminado con éxito",
    });
});
exports.deleteCustomer = deleteCustomer;
const createCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { body } = req;
    try {
        yield customer_1.Customer.create(body);
        res.json({
            msg: "El cliente fue agregado con éxito",
            customer: body
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "Ocurrió un error inesperado. Inténtelo más tarde"
        });
    }
});
exports.createCustomer = createCustomer;
const updateCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    console.log(body);
    console.log(id);
    try {
        const customer = yield customer_1.Customer.findByPk(id);
        if (!customer) {
            return res.status(404).json({
                msg: "El cliente que desea actualizar no existe"
            });
        }
        yield customer.update(body);
        res.json({
            msg: "El cliente fue actualizado con éxito",
            id,
            customer: body
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "Ocurrió un error inesperado. Inténtelo más tarde"
        });
    }
});
exports.updateCustomer = updateCustomer;
