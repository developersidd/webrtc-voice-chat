import ApiError from "../lib/ApiError.js";
import ApiResponse from "../lib/ApiResponse.js";
import asyncHandler from "../lib/asyncHandler.js";
import hashServices from "../services/hash.services.js";
import otpService from "../services/otp.services.js";

class AuthController {
  sendOTP = asyncHandler(async (req, res) => {
    const { phone = "", email = "" } = req.body || {};
    const isValidaPhone = /^\d+$/.test(phone);
    if (phone?.trim() === "") {
      throw new ApiError(400, "Enter a valid Phone number!");
    }
    const otp = otpService.generateOTP();
    const validationDuration = 1000 * 60 * 2; // 2min
    const expires = Date.now() + validationDuration;
    const data = `${phone}.${otp}.${expires}`;
    const hashed = hashServices.hashOtp(data);
    //const hashed = `f0be888f1c51db7fa533b252626d6ae35d165ed1ceb1f0f73b4ba
    //a1c5c658038.${expires}`;
    //const smsResponse = await otpService.sentOTPBySms(otp, phone);
    // console.log("🚀 ~ smsResponse:", smsResponse);
    const apiRes = new ApiResponse(200, "OTP sent successfully", {
      phone,
      hash: `${hashed}.${expires}`,
    });

    res.status(apiRes.statusCode).json(apiRes);
  });
  verifyOtp = asyncHandler(async (req, res) => {
    const { phone = "", otp = "", hash = "" } = req.body || {};

    if (![phone, otp, hash].every((val) => val?.trim())) {
      throw new ApiError(400, "All fields are required!");
    }
    const [hashedOtp, expires] = hash.split(".");
    if (Date.now() >= +expires) {
      throw new ApiError(400, "OTP expired!");
    }
    const data = `${phone}.${otp}.${expires}`;
    const isValid = otpService.verifyOTP(hashedOtp, data);
    if (!isValid) {
      throw ApiError(400, "OTP is invalid!")
    }
    
  });
}

export default new AuthController();
