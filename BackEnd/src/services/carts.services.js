import Carts from "../models/Carts.js";
import GenericServices from "./generic.services.js";
import { cartService } from "./services.js";

export default class CartsServices extends GenericServices{
    constructor(dao){
        super(dao, Carts.model)
    }

    getCreateCartById = async (params)=>{
        if(!cartService){
            cartService()
        }
        return cartService;
    }
}