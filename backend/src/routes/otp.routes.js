import { Router } from "express";
import { sendOTP } from "../controllers/otp.controller.js";

const router = Router();

router.post("send-otp", sendOTP);

export default router;
