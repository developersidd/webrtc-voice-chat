import ApiError from "../lib/ApiError.js";
import asyncHandler from "../lib/asyncHandler.js";
import jwtServices from "../services/jwt.services.js";
import userServices from "../services/user.services.js";

const verifyJWT = asyncHandler(async (req, res, next) => {
  const accessToken =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");
  //console.log("🚀 ~ accessToken:", accessToken)

  if (!accessToken) {
    throw new ApiError(401, "Unauthorized access!");
  }
  let decodedToken;
  try {
    decodedToken = await jwtServices.verifyAccessToken(
      accessToken,
    );
  } catch (error) {
    throw new ApiError(401, "Unauthorized access!");
  }

  const user = await userServices.findUser({ _id: decodedToken?._id });

  if (!user?._id) {
    throw new ApiError(401, "Invalid Access Token!");
  }

  console.log("🚀 ~ user?._doc:", user?._doc);
  req.user = {
    ...user?._doc,
    accessToken,
  };
  next();
});

const verifyRoles =
  (...roles) =>
  (req, res, next) => {
    if (!req?.user?._id || roles.includes(req?.user?.role)) {
      return next(new ApiError(403, "Forbidden"));
    }
    next();
  };

export { verifyJWT, verifyRoles };
