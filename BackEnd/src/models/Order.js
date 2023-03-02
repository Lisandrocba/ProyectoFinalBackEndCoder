import mongoose from "mongoose";
const Schema = mongoose.Schema;

export default class Order{
    constructor(data){
        this.data = data
    }

    static get model(){
        return "Order"
    }

    static get schema(){
        return{
            products: {
                type: Schema.Types.ObjectId,
                ref: "Carts"
            },
            user:{
                type: Schema.Types.ObjectId,
                ref: "User"
            }, 
            purchase_date: {
                hore: {
                    tyoe: String,
                    require: true,
                },
                day: {
                    tyoe: String,
                    require: true,
                },
                month: {
                    tyoe: String,
                    require: true,
                },
                year: {
                    tyoe: String,
                    require: true,
                }
            },
            total: {
                type: Number,
                require: true,
            }
        }
    }
}