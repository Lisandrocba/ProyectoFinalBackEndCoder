import app from './src/app.js';
import dotenv from 'dotenv';
import http from "node:http";
import sockets from "./src/sockets.js";
import { Server as WebSocketServer } from "socket.io";

dotenv.config()
const server = http.createServer(app);
const io = new WebSocketServer(server);
const PORT = process.env.PORT || 8081;

app.listen(PORT, ()=>{
    console.log(`Escuchando al puerto ${PORT}`);
    sockets(io);
})