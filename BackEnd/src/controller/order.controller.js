import { cartService, orderServices } from "../services/services";
import { generateDate } from "../utils";

const getOrderById = async (req, res) => {
  try {
    const id = req.cookies.userIdCookie;
    const orders = await orderServices.getById(id);
    if (!messages) {
      res.status(404);
      res.render("./pages/error.ejs", {
        code: 404,
        message: "Oder Not Found",
      });
    }
    res.send({ status: "success", orders });
  } catch (e) {
    console.log(e);
    res.status(500);
    res.render("./pages/error.ejs", {
      code: 500,
      message: "Internal Server Error",
    });
  }
};

const createOrder = async(req,res) => {
    try{
        const idCart = res.cookies.cartIdCookie;
        if(!idCart){
            res.status(404);
            res.render("./pages/error.ejs", {
              code: 404,
              message: "Cart Not Found",
            });
        }
        const {products} = await cartService.getById(idCart)
        let total = 0;
        products.forEach((product) => {
            total = total + product.price;
          });
        const date = generateDate(new Date(Date.now()))
        await cartService.delete(idCart);
        const newOrder = await orderServices.save({
            products,
            user: req.cookies.userIdCookie,
            purchase_date: date,
            total,
        })
        res.send({status: "succes", newOrder})
    }catch(e){
        console.log(e);
        res.status(500);
        res.render("./pages/error.ejs", {
          code: 500,
          message: "Internal Server Error",
        });
    }
};

export { getOrderById, createOrder };
