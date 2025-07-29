import express from "express";
import {
  getAllUsers,
  getUserByName,
  userSignup,
} from "../controllers/user.controller.js";
const router = express.Router();

router.post("/signup", userSignup);
router.get("/feed", getAllUsers); // feed api: get all users
router.get("/getUserByName", getUserByName); // get user by name

export default router;
