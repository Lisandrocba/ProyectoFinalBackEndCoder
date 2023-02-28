/* import { cartService, userService } from "../services/services.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const signUp = async(req,res)=>{
    const {userName, password, email, phone, file, age} = req.body
    if(!userName || !password || !email) return res.status(400).send({status:"error",error:"Incomplete values"});
    const usuarioExistente = await userService.getById({userName: userName})
    if(usuarioExistente) return res.status(400).send({status:"error",error:"User is already registered"});
    const passwordEncriptada = await bcrypt.hash(password, 10)
    const newCart = await cartService.save() 
    const newUser = await userService.save({userName, password: passwordEncriptada, email, cart: newCart, phone, file, age})
    const idNewUser = newUser._id
    res.send({status: "success", idNewUser, message: "user created successfully"})
}

const login = async(req,res)=>{
    const {userName, password} = req.body
    const userDB = await userService.getById({userName: userName})
    const result = await bcrypt.compare(password, userDB.password)
    if(!result) return res.status(400).send({status:"error",error:"User or password invalid"});
    const payload={
        id: userDB._id,
        userName
    }
    const token = jwt.sign(payload, "secretKey")
    res.send({status: "success", token,userName, message: "loging valid"})

}

export {
    signUp,
    login,
} */