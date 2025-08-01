import express from "express";
import {
  allConnections,
  getAllUsers,
  getRequests,
} from "../controllers/user.controller.js";
import { isAuth } from "../middlewares/isAuth.js";
const router = express.Router();

router.get("/feed", isAuth, getAllUsers); // feed api: get all users
router.get("/connections", isAuth, allConnections);
router.get("/requests", isAuth, getRequests);

export default router;
