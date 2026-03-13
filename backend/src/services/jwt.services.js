import jwt from "jsonwebtoken";

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
  async verifyAccessToken() {}
}

export default new JWTService();
