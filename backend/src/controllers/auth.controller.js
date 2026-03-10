import ApiError from "../lib/ApiError.js";
import ApiResponse from "../lib/ApiResponse.js";
import asyncHandler from "../lib/asyncHandler.js";
import hashServices from "../services/hash.services.js";
import otpService from "../services/otp.services.js";

class AuthController {
  sendOTP = asyncHandler(async (req, res) => {
    const {  email = "" } = req.body || {};
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const trimedEmail = email?.trim();
    
    if (!isValidEmail) {
      throw new ApiError(400, "Enter a valid Email Address!");
    }
    
    const otp = otpService.generateOTP();
    const validationDuration = 1000 * 60 * 2; // 2min
    const expires = Date.now() + validationDuration;
    const data = `${trimedEmail}.${otp}.${expires}`;
    const hashed = hashServices.hashOtp(data);
    
    const emailResponse = await otpService.sentOTPByEmail(otp, trimedEmail);
    console.log("🚀 ~ emailResponse:", emailResponse)
    const apiRes = new ApiResponse(200, "OTP sent successfully", {
      email: trimedEmail,
      hash: `${hashed}.${expires}`,
    });

   return res.status(apiRes.statusCode).json(apiRes);
  });
  verifyOtp = asyncHandler(async (req, res) => {
    const { email = "", otp = "", hash = "" } = req.body || {};

    if (![email, otp, hash].every((val) => val?.trim())) {
      throw new ApiError(400, "All fields are required!");
    }
    const [hashedOtp, expires] = hash.split(".");
    if (Date.now() >= +expires) {
      throw new ApiError(400, "OTP expired!");
    }
    const data = `${email}.${otp}.${expires}`;
    const isValid = otpService.verifyOTP(hashedOtp, data);
    if (!isValid) {
      throw ApiError(400, "OTP is invalid!");
    }
  });
}

export default new AuthController();
