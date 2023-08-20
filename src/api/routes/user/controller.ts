import { NextFunction, Request, Response } from "express";
import { APIRequest } from "src/api/types/request";

import { GetLogIn } from "./interfaces/get-log-in";
import { PostRegNewUser } from "./interfaces/post-reg-new-user";
import { userService } from "./service";

class UserController {
  async getUser(req: Request, res: Response) {
    res.json("user");
  }

  async createUser(
    { body }: APIRequest<PostRegNewUser>,
    res: Response,
    next: NextFunction
  ) {
    const { name, password, role } = body;

    try {
      await userService.reg(name, password, res, role);
    } catch (e) {
      return next(e);
    }
    return res.json("");
  }

  async logIn(
    { body }: APIRequest<GetLogIn>,
    res: Response,
    next: NextFunction
  ) {
    const { name, password } = body;
    try {
      await userService.logIn(name, password, res);
    } catch (e) {
      return next(e);
    }
    return res.json("success");
  }

  // async logOut(req: APIRequest, res: Response) {}
  // async refresh(req: APIRequest, res: Response) {}
  async logOut() {}
  async refresh() {}
}

export const userController = new UserController();
