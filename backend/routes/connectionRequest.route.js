import express from "express";
import {
  reviewConnectionRequest,
  sendConnectionRequest,
} from "../controllers/connectionRequest.controller.js";
const router = express.Router();
import { isAuth } from "../middlewares/isAuth.js";

router.post("/send/:status/:touserId", isAuth, sendConnectionRequest);
router.post("/review/:status/:requestId", isAuth, reviewConnectionRequest);

export default router;
