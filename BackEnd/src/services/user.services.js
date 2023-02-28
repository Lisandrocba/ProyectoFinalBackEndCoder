import User from "../models/User.js"
import GenericServices from "./generic.services.js"

export default class UserService extends GenericServices{
    constructor(dao){
        super(dao, User.model)
    }
}