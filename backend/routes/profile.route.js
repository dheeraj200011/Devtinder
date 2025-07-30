import express from "express";
import {
  deleteUser,
  getUser,
  updatePassword,
  updateUser,
} from "../controllers/profile.controller.js";
import { isAuth } from "../middlewares/isAuth.js";
const router = express.Router();

router.get("/getuserprofile", isAuth, getUser); // get user by name
router.patch("/edit", isAuth, updateUser); // update user by name
router.patch("/password", isAuth, updatePassword);

export default router;
