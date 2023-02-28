import Messages from "../models/Messages.js";
import GenericServices from "./generic.services.js";
import { messageServices } from "./services.js";

export default class MessageServices extends GenericServices{
    constructor(dao){
        super(dao, Messages.model)
    }

}