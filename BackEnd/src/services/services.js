import Dao from "../models/Dao.js";
import ProductService from "./product.services.js";
import CartsServices from "./carts.services.js";
import config from "../config/config.js";
import UserService from "./user.services.js";
import MessageServices from "./message.services.js";

const dao = new Dao(config.mongo)

export const productService = new ProductService(dao);
export const cartService = new CartsServices(dao);
export const userService = new UserService(dao);
export const messageServices  = new MessageServices(dao)
