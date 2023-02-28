export default class Products{
    constructor(data){
        this.data = data
    }

    static get model(){
        return "Products"
    }

    static get schema(){
        return{
            title: String,
            description: String,
            price: Number,
            code: String,
            stock: Number,
            img: String,
            status:{
                type: String,
                default: "available"
            }
        }
    }
}