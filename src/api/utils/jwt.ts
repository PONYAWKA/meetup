import JWT from "jsonwebtoken";

import { ApiError } from "../foundation/error/apiError";
import { getBuildEnv } from "./get-build-env";
class Token {
  generateTokens(name: string, role: string[]) {
    const AccessToken = JWT.sign(
      { name, role },
      process.env.SECRET_ACCESS_KEY as string,
      {
        expiresIn: "30m",
      }
    );
    const RefreshToken = JWT.sign(
      { name },
      process.env.SECRET_REFRESH_KEY as string,
      {
        expiresIn: "15d",
      }
    );
    return {
      AccessToken: AccessToken,
      RefreshToken: RefreshToken,
    };
  }
  verifyAccessToken(AccessToken: string) {
    try {
      const verifyAccessToken = JWT.verify(
        AccessToken,
        getBuildEnv("SECRET_ACCESS_KEY") as string
      ) as JWT.JwtPayload;
      return verifyAccessToken;
    } catch (e) {
      throw ApiError.unAuthorized("token expired");
    }
  }
  verifyRefreshToken(refreshToken: string) {
    try {
      const verifyRefreshToken = JWT.verify(
        refreshToken,
        getBuildEnv("SECRET_REFRESH_KEY") as string
      ) as JWT.JwtPayload;
      return verifyRefreshToken;
    } catch (e) {
      throw ApiError.unAuthorized("token expired");
    }
  }
}

export const JWTToken = new Token();
