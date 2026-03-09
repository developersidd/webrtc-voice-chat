import { Router } from "express";
import authController from "../controllers/auth.controller.js";

const router = Router();

router.post("/send-otp", authController.sendOTP);
router.post("/verify-otp", authController.verifyOtp);

export default router;
