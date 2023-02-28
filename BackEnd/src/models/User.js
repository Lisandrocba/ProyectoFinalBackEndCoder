import mongoose from "mongoose";
const Schema = mongoose.Schema;

export default class User{
    constructor(data){
        this.data = data
    }

    static get model(){
        return "User"
    }

    static get schema(){
        return{
            userName : String,
            password : String,
            email: String,
            cart:{
                type:Schema.Types.ObjectId,
                ref: "cart"
            },
            phone: String,
            file: String,
            age: Number
        }
    }
}