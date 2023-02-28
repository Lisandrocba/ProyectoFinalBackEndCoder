import { Router } from "express";
import { createCart, addProduct, deleteCart, deleteProductByCart, getProductsByCartId, updateCart} from "../controller/cart.controller.js"

const router = Router()

router.get("/:cid/products", getProductsByCartId);
router.post("/", createCart);
router.post("/:cid/products/:pid", addProduct);
router.put("/:cid", updateCart)
router.delete("/:cid", deleteCart);
router.delete("/:cid/products/:pid/delete", deleteProductByCart)

export default router;