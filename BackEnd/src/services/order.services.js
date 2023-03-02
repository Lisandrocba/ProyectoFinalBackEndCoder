import Order from "../models/Order";
import GenericServices from "./generic.services";

export default class OrderServices extends GenericServices{
    constructor(dao){
        super(dao, Order.model)
    }
}