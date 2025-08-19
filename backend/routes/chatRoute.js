import express from "express";
import { getOrCreateChat } from "../controllers/chat.controller.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = express.Router();

router.get("/getChat/:id", isAuth, getOrCreateChat);

export default router;
