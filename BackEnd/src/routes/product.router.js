import express from "express"
import { Router } from "express";
import {
    getAllProducts,
    getProductById,
    saveProduct,
    updateProduct,
    deleteProduct
} from "../controller/product.controller.js";

const router = Router();

router.get('/', getAllProducts);
router.get('/:pid', getProductById)
router.post('', saveProduct)
router.put('/:pid', updateProduct)
router.delete('/:pid', deleteProduct)

export default router
