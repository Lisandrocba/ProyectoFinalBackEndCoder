import jwt from "jsonwebtoken";


export const isAuth = (req,res,next)=>{
    const token = req.cookies.token;
  try {
    if (!token) {
        console.log("pasa por aca la concha de la lora")
      res.status(302);
      return res.redirect("/login");
    }
    const user = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    req.user = user;
    next();
  } catch (err) {
    res.status(302);
    res.clearCookie("token");
    return res.redirect("/");
  }
}
