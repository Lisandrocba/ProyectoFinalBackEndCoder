import Products from "../models/Products.js";
import GenericServices from "./generic.services.js";

export default class ProductService extends GenericServices{
    constructor(dao){
        super(dao,Products.model);
    }
}