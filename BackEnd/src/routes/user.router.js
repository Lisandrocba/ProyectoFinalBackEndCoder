import { Router } from "express";
import { isAuth } from "../middleware/isAuthenticated.js";
import { passportCall } from "../utils.js";

const router = Router()

router.post("/signup", passportCall("register"),(req,res)=>{
    res.redirect("/login")
})
router.post("/login" ,passportCall("login"),(req,res)=>{
    
    const user= req.user;
    res
    .cookie("token", user.token, {
        httpOnly: true
    })
    .redirect("/")
})


export default router;