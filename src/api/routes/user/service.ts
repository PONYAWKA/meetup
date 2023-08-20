import { Response } from "express";
import { accessTokenKey, refreshTokenKey } from "src/api/constants";
import { ApiError } from "src/api/foundation/error/apiError";
import { User } from "src/api/types/user";
import { comparePassword, hashPassword, JWTToken } from "src/api/utils";
import { setupTokens } from "src/api/utils/setup-tokens";
import { DB } from "src/data-base/db";
import { createUserSQL } from "src/data-base/sqls/user/create-user.sql";
import { getUserByName } from "src/data-base/sqls/user/get-user-by-name";
import { updateRefreshToken } from "src/data-base/sqls/user/update-refresh-token";
class UserService {
  private async updateRefreshToken(name: string, token: string) {
    return await DB.query(updateRefreshToken, [token, name]);
  }

  async reg(
    userName: string,
    password: string,
    res: Response,
    role?: string[]
  ) {
    const hashedPassword = await hashPassword(password);

    const userRequest = await DB.query<User>(createUserSQL, [
      userName,
      hashedPassword,
      role ?? ["user", "admin"],
    ]);

    const user = userRequest.rows[0];

    const tokens = JWTToken.generateTokens(
      user.name,
      role ?? ["user", "admin"]
    );

    setupTokens(res, tokens.AccessToken, tokens.RefreshToken);

    return user;
  }

  async logIn(userName: string, password: string, res: Response) {
    const userRequest = await DB.query<User>(getUserByName, [userName]);

    const user = userRequest.rows[0];

    if (comparePassword(user.password, password)) {
      throw ApiError.unAuthorized("incorrect password");
    }

    const tokens = JWTToken.generateTokens(user.name, user.role);

    setupTokens(res, tokens.AccessToken, tokens.RefreshToken);

    this.updateRefreshToken(user.name, tokens.RefreshToken);

    return user;
  }

  async refresh(res: Response) {
    const { name } = JWTToken.verifyRefreshToken(
      res.locals.cookie[refreshTokenKey]
    );

    const userRequest = await DB.query<User>(getUserByName, [name]);

    const user = userRequest.rows[0];

    const tokens = JWTToken.generateTokens(user.name, user.role);

    setupTokens(res, tokens.AccessToken, tokens.RefreshToken);

    this.updateRefreshToken(user.name, tokens.RefreshToken);
  }

  async logOut(res: Response) {
    res.clearCookie(refreshTokenKey);
    res.clearCookie(accessTokenKey);
  }
}

export const userService = new UserService();
