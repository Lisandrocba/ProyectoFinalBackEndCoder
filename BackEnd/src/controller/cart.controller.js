import { cartService, productService } from "../services/services.js";


const createCart = async (req,res)=>{
    const newCart = await cartService.save()
    res.send({status: "success", message: "carrito creado", cart: newCart})
}

const addProduct = async(req,res)=>{
    let {cid,pid} = req.params;
    let {quantity} = req.body;
    let product = await productService.getById({_id:pid});
    if(!product) return res.status(404).send({status:"error",error:"Product not found"});
    let cart = await cartService.getById({_id:cid});
    if(!cart) return res.status(404).send({status:"error",error:"Cart not found"});
    if(product.stock===0) return res.status(400).send({status:"error",error:"No stock"});
    if(product.stock<quantity){
        quantity=product.stock
        return res.status(400).send({status:"error",error:`Stock product is ${quantity}`});
    }
    product.stock = product.stock - quantity;
    if(product.stock===0)
        product.status="unavailable"
    await productService.update(pid,product);
    const productInCart = cart.products.find(elemento=>  elemento.product.toString() === pid)
    if(!productInCart){
        cart.products.push({product:pid,quantity});
    }else{
        cart.products.map(item=> {
            if(item.product.toString() === pid){
                item.quantity += quantity
            }
        })
    }
    await cartService.update(cid,cart);
    res.send({status:"success", newQuantity:quantity ,message:"Product added"})
}

const getProductsByCartId = async(req,res)=>{
    try{
        const {cid} = req.params
        let cart = await cartService.getById({_id:cid});
        if(!cart) return res.status(404).send({status:"error",error:"Cart not found"});
        res.send({status:"success", cart: cart.products})
    }catch(e){
        console.log(e)
        res.status(500);
        res.render("./pages/error.ejs", {
        code: 500,
        message: "Internal Server Error",
        });
    }
}

const updateCart = async (req,res)=>{
    const {cid} = req.params
    const product = req.body
    const cart = await cartService.getById({_id:cid})
    if(!cart)  return res.status(404).send({status:"error",error:"Can't find cart"});
    const productMemory = await productService.getById({_id:product._id})
    if(productMemory.stock < product.quentity) return res.status(404).send({status:"error",error:"no stock"});
    productMemory.stock -= product.quantity
    productService.update(product._id, productMemory)
    cart.products.map(elemento => {
        if(elemento.product.toString() === product._id){
            elemento.quantity = product.quantity
        }
    })
    await cartService.update(cid,cart);
    res.send({status:"success" ,message:"Product update"})
}

const deleteCart = async (req,res)=>{
    const {cid} = req.params
    const cartDelete = await cartService.getById({_id : cid})
    cartDelete.products = []
    await cartService.update(cid, cartDelete)
    res.send({status:"success", message: "Cart delete"})
}

const deleteProductByCart = async (req,res)=>{
    const {cid, pid} = req.params
    const cart = await cartService.getById({_id: cid})
    if(!cart)  return res.status(404).send({status:"error",error:"Can't find cart"});
    const resCart = cart.products.filter(elemento => elemento.product.toString() !== pid)
    cart.products = resCart
    await cartService.update(cid,cart);
    res.send({status:"success" ,message:"Product of cart delete"})
}
export {
    createCart,
    getProductsByCartId,
    deleteCart,
    deleteProductByCart,
    addProduct,
    updateCart
}