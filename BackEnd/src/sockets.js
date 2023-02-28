import { messageServices } from "./services/services.js";

export default (io) => {
  io.on("connection", async (socket) => {
    console.log(`${socket.id} connected.`);

    io.emit("messages", await messageServices.getAll());
  });
};
