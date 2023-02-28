import passport from "passport";
import local from "passport-local";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cartService, userService } from "../services/services.js";
const LocalStrategy = local.Strategy;

const myPassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "userName", session: false },
      async (req, username, password, done) => {
        const { userName, email, phone, file, age } = req.body;
        console.log(req.body)
        try {
          if (!userName || !password || !email)
            return done(null, false, { messages: "Incomplete values" });
          const usuarioExistente = await userService.getById({
            userName: userName,
          });
          if (usuarioExistente)
            return done(null, false, {
              messages: "User is already registered",
            });
          const passwordEncriptada = await bcrypt.hash(password, 10);
          const newCart = await cartService.save();
          const newUser = await userService.save({
            userName,
            password: passwordEncriptada,
            email,
            cart: newCart,
            phone,
            file,
            age,
          });
          return done(null, newUser);
        } catch (e) {
          console.log(e);
          return done(e);
        }
      }
    )
  );
  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "userName" },
      async (userName, password, done) => {
        try {
          const userDB = await userService.getById({ userName: userName });
          const result = await bcrypt.compare(password, userDB.password);
          if (!result)
            return done(null, false, { messages: "User or password invalid" });
          const payload = {
            id: userDB._id,
            userName,
          };
          const token = jwt.sign(payload, process.env.JWT_SECRET_TOKEN);
          const resul = { payload, token };
          return done(null, resul);
        } catch (e) {
          console.log(e);
          return done(e);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    return done(null, user._id);
  });
  passport.deserializeUser(async (id, done) => {
    let result = await userService.getBy({ _id: id });
    return done(null, result);
  });
};

export default myPassport;
