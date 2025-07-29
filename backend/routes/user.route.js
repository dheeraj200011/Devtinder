import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUserByName,
  userSignup,
  updateUser,
  userLogin,
} from "../controllers/user.controller.js";
const router = express.Router();

router.post("/signup", userSignup);
router.post("/login", userLogin);
router.get("/feed", getAllUsers); // feed api: get all users
router.get("/getUserByName", getUserByName); // get user by name
router.get("/delete/:id", deleteUser); // delete user by name
router.patch("/updateuser/:id", updateUser); // update user by name

export default router;
