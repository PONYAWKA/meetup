import JWT from "jsonwebtoken";
class Token {
  generateTokens(id: string, role: string[]) {
    const AccessToken = JWT.sign(
      { id, role },
      process.env.SECRET_ACCESS_KEY as string,
      {
        expiresIn: "30m",
      }
    );
    const RefreshToken = JWT.sign(
      { id },
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
    const verifyAccessToken = JWT.verify(
      AccessToken,
      process.env.SECRET_ACCESS_KEY as string
    );
    return verifyAccessToken;
  }
  verifyRefreshToken(RefreshToken: string) {
    const verifyRefreshToken = JWT.verify(
      RefreshToken,
      process.env.SECRET_REFRESH_KEY as string
    );
    return verifyRefreshToken;
  }
}

export const JWTToken = new Token();
