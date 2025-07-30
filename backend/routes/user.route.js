import express from "express";
import { getAllUsers } from "../controllers/user.controller.js";
const router = express.Router();

router.get("/feed", getAllUsers); // feed api: get all users

export default router;
