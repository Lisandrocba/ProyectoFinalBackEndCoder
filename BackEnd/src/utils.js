import passport from "passport";
import nodemailer from "nodemailer"

export const passportCall = (strategy) =>{
    return async(req, res, next) =>{
        passport.authenticate(strategy,function(err, user, info) {
          if (err) return next(err);
          if (!user) {
            return res.status(401).send({error:info.messages?info.messages:info});
          }
          req.user = user;
          next();
        })(req, res, next);
      }
}

const transporter = nodemailer.createTransport({
  service : 'gmail',
  port: 587,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS 
  }
})

export const sendMail = async ()=>{
  try{
    await transporter.sendMail({
      from: 'Usuario Registrado en tiendita<lisandrocba7@gmail.com>',
      to: 'lisandrocba7@gmail.com',
      subject: 'Usuario registrado',
      html: '<h1>Usuario registrado</h1>'
    })
  }catch(e){
    console.log(e)
  }
}   
