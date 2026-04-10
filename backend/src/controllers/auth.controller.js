import { Jimp } from "jimp";
import path from "path";
import UserDto from "../dtos/user.dto.js";
import ApiError from "../lib/ApiError.js";
import ApiResponse from "../lib/ApiResponse.js";
import asyncHandler from "../lib/asyncHandler.js";
import { getDirName } from "../lib/utils.js";
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
    const data = `${trimedEmail}.${otp}.${expires}`; // Adds expires to make it more protectable, because user can generate expires and pass the expires validation check step but I can't pass the hash matching.
    const hashed = hashServices.hashOtp(data);

    const emailResponse = await otpService.sentOTPByEmail(otp, trimedEmail);
    console.log("🚀 ~ emailResponse:", emailResponse);
    const apiRes = new ApiResponse(
      200,
      {
        email: trimedEmail,
        hash: `${hashed}.${expires}`,
      },
      "OTP sent successfully",
    );

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
    const apiRes = new ApiResponse(
      200,
      {
        user: userDto,
        isAuth: true,
      },
      "OTP Verified successfully",
    );

    res.cookie("refreshToken", refreshToken, {
      maxAge: 864000000, // 10 days
      httpOnly: true,
      secure: true,
    });

    res.cookie("accessToken", accessToken, {
      maxAge: 864000000, // 10 days
      httpOnly: true,
      secure: true,
    });

    return res.status(apiRes.statusCode).json(apiRes);
  });
  activate = asyncHandler(async (req, res) => {
    const { avatar = "", name = "" } = req.body || {};

    if (!avatar?.trim() || !name?.trim()) {
      throw new ApiError(400, "Avatar & Name fields are required!");
    }

    const avatarPath = `/storage/avatars/${name?.split(" ")?.at(-1)?.toLowerCase()}-${Date.now()}.png`;
    console.log("🚀 ~ avatarPath:", avatarPath);
    // Resize and save avatar to storage
    const buffer = Buffer.from(avatar?.split(",")[1], "base64");
    const jimpRes = await Jimp.read(buffer);
    //console.log("🚀 ~ jimpRes:", jimpRes)
    jimpRes
      .resize({
        h: Jimp.AUTO,
        w: 150,
      })
      .write(path.resolve(getDirName(import.meta.url), `..${avatarPath}`));
    console.log("🚀 ~path ", getDirName(import.meta.url), `..${avatarPath}`);

    const userId = req?.user?._id;
    console.log("🚀 ~ userId:", userId);
    const user = await userServices.findUser({ _id: userId });

    if (!user?._id) {
      throw new ApiError(404, "User not found!");
    }
    user.fullName = name;
    user.avatar = avatarPath;
    user.activated = true;
    await user.save();
    console.log("🚀 ~ user:", user);
    const response = new ApiResponse(
      200,
      { user: new UserDto(user) },
      "Account Activated successfully",
    );
    return res.status(response.statusCode).json(response);
  });

  refreshAccessToken = asyncHandler(async (req, res) => {
    const refreshTokenFromCookie = req.cookies?.refreshToken;
    console.log("🚀 ~ refreshTokenFromCookie:", refreshTokenFromCookie);

    if (!refreshTokenFromCookie) {
      throw new ApiError(401, "Unauthorized access!");
    }

    // check if user valid
    const userData = await jwtServices.verifyRefreshToken(
      refreshTokenFromCookie,
    );
    //console.log("🚀 ~ userData:", userData);

    const user = await userServices.findUser({
      _id: userData?._id,
      refreshToken: refreshTokenFromCookie,
    });
    console.log("🚀 ~ user:", user);

    if (!user?._id) {
      console.log("MAtc");
      throw new ApiError(401, "Unauthorized access!");
    }
    // generrate tokens
    const { accessToken, refreshToken } = await jwtServices.generateTokens({
      _id: user?._id,
    });
    //console.log("🚀 ~new accessToken:", accessToken);
    user.refreshToken = refreshToken;
    await user.save();
    const userDto = new UserDto(user);
    const apiRes = new ApiResponse(
      200,
      {
        user: userDto,
        isAuth: true,
      },
      "Access Token refreshed successfully!",
    );

    res.cookie("refreshToken", refreshToken, {
      maxAge: 864000000, // 10 days
      httpOnly: true,
      secure: true,
    });

    res.cookie("accessToken", accessToken, {
      maxAge: 864000000, // 10 days
      httpOnly: true,
      secure: true,
    });

    return res.status(apiRes.statusCode).json(apiRes);
  });
  logout = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const user = await userServices.findUser({ _id: userId });
    user.refreshToken = "";
    await user.save();
    const apiRes = new ApiResponse(
      200,
      {
        user: null,
        isAuth: false,
      },
      "Logged out successfully",
    );

    res.clearCookie("refreshToken");
    res.clearCookie("accessToken");

    return res.status(apiRes.statusCode).json(apiRes);
  });
}

export default new AuthController();
