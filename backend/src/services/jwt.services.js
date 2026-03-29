import jwt from "jsonwebtoken";
const accessTokenScret = process.env.JWT_ACCESS_TOKEN_SECRET;
const refreshTokenScret = process.env.JWT_REFRESH_TOKEN_SECRET;

class JWTService {
  async generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION,
    });

    const refreshToken = jwt.sign(
      payload,
      process.env.JWT_REFRESH_TOKEN_SECRET,
      {
        expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRATION,
      },
    );
    return {
      accessToken,
      refreshToken,
    };
  }
  async verifyAccessToken(accessToken) {
    return jwt.verify(accessToken, accessTokenScret);
  }

  async verifyRefreshToken(refreshToken) {
    return jwt.verify(refreshToken, refreshTokenScret);
  }
}

export default new JWTService();
