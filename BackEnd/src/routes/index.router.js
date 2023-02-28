import { Router } from "express";
import productRouter from "./product.router.js";
import cartRouter from "./cart.router.js";
import userRouter from "./user.router.js";
import { isAuth } from "../middleware/isAuthenticated.js";
import { productService, userService } from "../services/services.js";

const router = Router();

router.use("/api/productos", productRouter);
router.use("/api/carrito", cartRouter);
router.use("/api/usuario", userRouter);

router.use("/login", (req, res) => {
  res.render("./pages/login.ejs");
});
router.use("/register", (req, res) => {
  res.render("./pages/register.ejs");
});
router.use("/home", isAuth, async (req, res) => {
  try {
    const name = req.user.userName;
    const products = await productService.getAll();
    const user = await userService.getAll({ _id: req.user.id });
    const cartId = user[0].cart.toString();
    res
      .cookie("cartIdCookie", cartId, {
        httpOnly: true,
        secure: true,
        expires: new Date(Date.now() + 300000),
      })
      .cookie("userIdCookie", user[0]._id, {
        httpOnly: true,
        secure: true,
        expires: new Date(Date.now() + 300000),
      })
      .render("index.ejs", {
        sectionTitle: "Productos",
        products,
        cartId: cartId,
        userId: req.cookies.userIdCookie,
      });

    res.render("./index.ejs", { name });
  } catch (e) {
    console.log(e);
  }
});

export default router;
