import { Router } from "express";
import authController from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/send-otp", authController.sendOTP);
router.post("/verify-otp", authController.verifyOtp);
router.post("/activate", verifyJWT, authController.activate);

export default router;
