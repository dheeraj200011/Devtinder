import express from "express";
import { getAllUsers } from "../controllers/user.controller.js";
import { isAuth } from "../middlewares/isAuth.js";
const router = express.Router();

router.get("/feed", isAuth, getAllUsers); // feed api: get all users

export default router;
