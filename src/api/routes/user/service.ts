import { Response } from "express";
import { ApiError } from "src/api/foundation/error/apiError";
import { User } from "src/api/types/user";
import { comparePassword, hashPassword, JWTToken } from "src/api/utils";
import { setupTokens } from "src/api/utils/setup-tokens";
import { DB } from "src/data-base/db";
import { createUserSQL } from "src/data-base/sqls/create-user.sql";
import { getUserByName } from "src/data-base/sqls/get-user-by-name";
import { updateRefreshToken } from "src/data-base/sqls/update-refresh-token";
class UserService {
  private async updateRefreshToken(id: string, token: string) {
    return await DB.query(updateRefreshToken, [token, id]);
  }

  async reg(
    userName: string,
    password: string,
    res: Response,
    role?: string[]
  ) {
    const hashedPassword = await hashPassword(password);

    const userRequest = await DB.query<{ id: string }>(createUserSQL, [
      userName,
      hashedPassword,
      role ?? ["user"],
    ]);

    const user = userRequest.rows[0];

    const tokens = JWTToken.generateTokens(user.id, role ?? ["user", "admin"]);

    setupTokens(res, tokens.AccessToken, tokens.RefreshToken);

    return user;
  }

  async logIn(userName: string, password: string, res: Response) {
    const userRequest = await DB.query<User>(getUserByName, [userName]);

    const user = userRequest.rows[0];

    if (comparePassword(user.password, password)) {
      throw ApiError.unAuthorized("incorrect password");
    }

    const tokens = JWTToken.generateTokens(user.id, user.role);

    setupTokens(res, tokens.AccessToken, tokens.RefreshToken);

    this.updateRefreshToken(user.id, tokens.RefreshToken);

    return user;
  }
}

export const userService = new UserService();
