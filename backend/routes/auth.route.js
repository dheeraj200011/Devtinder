import express from "express";
import {
  userSignup,
  userLogin,
  userLogout,
} from "../controllers/auth.controller.js";
import { isAuth } from "../middlewares/isAuth.js";
const router = express.Router();

router.post("/signup", userSignup);
router.post("/login", userLogin);
router.get("/logout", isAuth, userLogout); // logout api


export default router;
