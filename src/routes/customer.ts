import { Router } from "express";
import { createCustomer, deleteCustomer, getCustomer, getCustomers, updateCustomer } from "../controllers/customer";

const router = Router();

router.get("/", getCustomers);
router.get("/:id", getCustomer);
router.delete("/:id", deleteCustomer);
router.post("/", createCustomer);
router.put("/:id", updateCustomer);

export default router;