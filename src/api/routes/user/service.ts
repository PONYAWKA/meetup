import { hashPassword } from "src/api/utils";
import { DB } from "src/data-base/db";
import { createUserSQL } from "src/data-base/sqls/create-user.sql";

class UserService {
  async reg(userName: string, password: string, role?: string[]) {
    const hashedPassword = await hashPassword(password);
    const user = await DB.query<{ id: string }>(createUserSQL, [
      userName,
      hashedPassword,
      role ?? ["user"],
    ]);
    return user;
  }
}

export const userService = new UserService();
