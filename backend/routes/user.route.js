import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUserByName,
  userSignup,
  updateUser,
} from "../controllers/user.controller.js";
const router = express.Router();

router.post("/signup", userSignup);
router.get("/feed", getAllUsers); // feed api: get all users
router.get("/getUserByName", getUserByName); // get user by name
router.get("/delete", deleteUser); // delete user by name
router.patch("/updateuser", updateUser); // update user by name

export default router;
