import { Router } from "express";
import { createMessage, getAllMessage, getMessageById } from "../controller/message.controller.js";

const router = Router()

router.get("/message", getAllMessage)
router.get("/message/:id", getMessageById)
router.post("/message", createMessage)

export default router