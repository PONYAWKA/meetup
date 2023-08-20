import { Request, Response } from "express";
import { APIRequest } from "src/api/types/request";

import { JWTToken } from "../../utils/jwt";
import { PostRegNewUser } from "./interfaces";
import { userService } from "./service";

class UserController {
  async getUser(req: Request, res: Response) {
    res.json("user");
  }
  async createUser(req: APIRequest<PostRegNewUser>, res: Response) {
    const { name, password, role } = req.body;
    console.log(process.env["SECRET_ACCESS_KEY"]);
    const user = await userService.reg(name, password, role);
    console.log(user.rows[0].id);
    const tokens = JWTToken.generateTokens(user.rows[0].id, role ?? ["user"]);
    res.cookie("refresh", tokens.RefreshToken);
    res.json(tokens);
  }
}

export const userController = new UserController();
