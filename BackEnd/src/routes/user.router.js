import { Router } from "express";
import { isAuth } from "../middleware/isAuthenticated.js";
import { passportCall } from "../utils.js";

const router = Router()

router.post("/signup", passportCall("register"),(req,res)=>{
    res.redirect("/login").json({status:"success",message:"Signed Up"})
})
router.post("/login" ,isAuth ,passportCall("login"),(req,res)=>{
    const user= req.user;
    res
    .cookie("token", user.token, {
        httpOnly: true
    })
    .redirect("/home")
})


export default router;