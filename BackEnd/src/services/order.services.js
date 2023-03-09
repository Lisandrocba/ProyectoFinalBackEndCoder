import Order from "../models/Order.js";
import GenericServices from "./generic.services.js";

export default class OrderServices extends GenericServices{
    constructor(dao){
        super(dao, Order.model)
    }
}