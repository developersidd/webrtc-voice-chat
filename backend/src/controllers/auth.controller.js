import UserDto from "../dtos/user.dto.js";
import ApiError from "../lib/ApiError.js";
import ApiResponse from "../lib/ApiResponse.js";
import asyncHandler from "../lib/asyncHandler.js";
import hashServices from "../services/hash.services.js";
import jwtServices from "../services/jwt.services.js";
import otpService from "../services/otp.services.js";
import userServices from "../services/user.services.js";

class AuthController {
  sendOTP = asyncHandler(async (req, res) => {
    const { email = "" } = req.body || {};
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const trimedEmail = email?.trim();

    if (!isValidEmail) {
      throw new ApiError(400, "Enter a valid Email Address!");
    }

    const otp = otpService.generateOTP();
    const validationDuration = 1000 * 60 * 60 * 24 * 30; // 2min
    const expires = Date.now() + validationDuration;
    console.log("🚀 ~ expires:", expires);
    const data = `${trimedEmail}.${otp}.${expires}`;
    const hashed = hashServices.hashOtp(data);

    const emailResponse = await otpService.sentOTPByEmail(otp, trimedEmail);
    console.log("🚀 ~ emailResponse:", emailResponse);
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
      throw new ApiError(400, "OTP is invalid!");
    }

    // check if user already exist
    let user = await userServices.findUser({ email });
    if (!user) {
      user = await userServices.createUser({
        email,
      });
    }

    // JWT Token
    const { accessToken, refreshToken } = await jwtServices.generateTokens({
      _id: user?._id,
      activated: false,
    });
    user.refreshToken = refreshToken;
    await user.save();
    const userDto = new UserDto(user);
    const apiRes = new ApiResponse(200, "OTP Verified successfully", {
      accessToken,
      user: userDto,
    });
    res.cookie("refreshToken", refreshToken, {
      maxAge: 864000000, // 10 days
      httpOnly: true,
      secure: true,
    });
    return res.status(apiRes.statusCode).json(apiRes);
  });
}

export default new AuthController();
