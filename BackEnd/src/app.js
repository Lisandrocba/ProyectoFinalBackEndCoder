import express, { urlencoded } from 'express';
import cors from 'cors';
import router from "./routes/index.router.js";
import passport from 'passport';
import myPassport from './config/localPassport.js';
import cookieParser from 'cookie-parser';

const app = express()

app.use(cors())
app.use(express.json())
app.use(urlencoded({extended: true}))
app.use(cookieParser())

//passport
myPassport();
app.use(passport.initialize());


//routes
app.use(router);

// View Engine
app.set("view engine", "ejs");
app.set("views", "./public/views")

export default app