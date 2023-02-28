import mongoose from "mongoose";

const Schema = mongoose.Schema()

export default class Messages{
    constructor(data){
        this.data = data
    }

    static get model(){
        return "Message"
    }

    static get schema(){
        return{
            author:{
                type: Schema.Types.ObjectId,
                ref: "User"
            },
            content: String
        }
    }
}