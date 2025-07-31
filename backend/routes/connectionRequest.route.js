import express from "express";
import { sendConnectionRequest } from "../controllers/connectionRequest.controller.js";
const router = express.Router();
import { isAuth } from "../middlewares/isAuth.js";

router.post("/send/:status/:touserId", isAuth, sendConnectionRequest);

export default router;
