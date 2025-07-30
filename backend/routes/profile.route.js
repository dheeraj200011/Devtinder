import express from "express";
import {
  deleteUser,
  getUser,
  updateUser,
} from "../controllers/profile.controller.js";
import { isAuth } from "../middlewares/isAuth.js";
const router = express.Router();

router.get("/getuserprofile", isAuth, getUser); // get user by name
router.get("/delete/:id", deleteUser); // delete user by name
router.patch("/updateuser/:id", updateUser); // update user by name

export default router;
