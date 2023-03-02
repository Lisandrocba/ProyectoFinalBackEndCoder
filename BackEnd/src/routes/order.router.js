import { Router } from "express";
import { createOrder, getOrderById } from "../controller/order.controller";
const router = Router();

router.get('/', getOrderById);
router.post('/', createOrder);

export default router;