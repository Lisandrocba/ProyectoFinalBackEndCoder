import {productService} from '../services/services.js'

const getAllProducts = async(req,res)=>{
    let products = await productService.getAll();
    res.send({status: "success", payload: products})
}

const getProductById = async(req,res)=>{
    let id = req.params.pid;
    try{
        let product = await productService.getById({_id:id})
        if(!product) res.status(404).send({status: "error", error : "Not found"})
        res.send({status: "success", payload: product})
    }catch(e){
        console.log(e)
        res.status(500);
        res.render("./pages/error.ejs", {
        code: 500,
        message: "Internal Server Error",
        });
    }
}

const saveProduct = async (req,res)=>{
    const {title, description, code, stock, price} = req.body;
    if(!title||!description||!code||!stock||!price) return res.status(400).send({status:"error",error:"Incomplete values"});
    await productService.save({
        title, description, code, stock, price
    })
    res.send({status: "success", message: "Product add"})
}

const updateProduct = async (req,res)=>{
    const {pid} = req.params;
    const content = req.body;
    const product = await productService.getById({_id:pid})
    if(!product) res.status(404).send({status:"error",error:"Not found"})
    await productService.update(pid, content)
    res.send({status: "success", message: "Product update"})
}

const deleteProduct = async (req,res)=>{
    const {pid} = req.params;
    const product = await productService.getById({_id:pid})
    if(!product) return res.status(404).send({status:"error",error:"Not found"})
    await productService.delete(pid)
    res.send({status: "success", message: "Product delete"})
}

export{
    getAllProducts,
    getProductById,
    saveProduct,
    updateProduct,
    deleteProduct
}