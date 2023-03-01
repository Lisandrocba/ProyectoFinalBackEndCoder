import { Router } from "express";
import productRouter from "./product.router.js";
import cartRouter from "./cart.router.js";
import userRouter from "./user.router.js";
import messagesRouter from "./message.router.js"
import { isAuth } from "../middleware/isAuthenticated.js";
import { productService, userService } from "../services/services.js";

const router = Router();

router.use("/", isAuth, async (req, res) => {
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
        name,
        sectionTitle: "Productos",
        products,
        cartId: cartId,
        userId: req.cookies.userIdCookie,
      });
    } catch (e) {
      console.log(e)
      res.render("./pages/error.ejs", {
        code: 500,
        message: "Internal Server Error",
      });
    }
  });
  
  router.use("/login", (req, res) => {
    res.render("./pages/login.ejs");
  });
  
  router.use("/register", (req, res) => {
    res.render("./pages/register.ejs");
  });

  router.use("/api/productos", productRouter);
  router.use("/api/carrito", cartRouter);
  router.use("/api/usuario", userRouter);
  router.use("/api/message", messagesRouter)
  
  
  router.use((req, res) => {
    res.status(404);
    res.render("./pages/error.ejs", {
      code: 404,
      message: "Not Found",
    });
  });

export default router;
