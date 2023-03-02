import { Router } from "express";
import { createMessage, getAllMessage, getMessageById } from "../controller/message.controller.js";

const router = Router()

router.get("/", getAllMessage)
router.get("/:id", getMessageById)
router.post("/", createMessage)

export default router