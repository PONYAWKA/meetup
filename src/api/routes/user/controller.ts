import { NextFunction, Response } from "express";
import { GetLogInDTO } from "src/api/dto/get-login.dto";
import { PostRegNewUserDTO } from "src/api/dto/post-reg-new-user.dto";
import { APIRequest } from "src/api/types/request";
import { validateRequest } from "src/api/utils/validate-request";

import { GetLogIn } from "./interfaces/get-log-in";
import { PostRegNewUser } from "./interfaces/post-reg-new-user";
import { userService } from "./service";

class UserController {
  async createUser(
    { body }: APIRequest<PostRegNewUser>,
    res: Response,
    next: NextFunction
  ) {
    const { name, password, role } = body;
    try {
      const validate = await validateRequest(body, PostRegNewUserDTO);
      if (validate) throw validate;
    } catch (e) {
      next(e);
    }

    try {
      await userService.reg(name, password, res, role);
    } catch (e) {
      next(e);
    }
    res.json();
  }

  async logIn(
    { body }: APIRequest<GetLogIn>,
    res: Response,
    next: NextFunction
  ) {
    const { name, password } = body;

    const validate = validateRequest(body, GetLogInDTO);
    if (validate) throw validate;

    try {
      await userService.logIn(name, password, res);
    } catch (e) {
      next(e);
    }
    res.json();
  }

  async refresh(_req: APIRequest, res: Response, next: NextFunction) {
    try {
      await userService.refresh(res);
      res.status(200).json();
    } catch (e) {
      next(e);
    }
  }

  async logOut(_req: APIRequest, res: Response, next: NextFunction) {
    try {
      await userService.logOut(res);
      res.status(200).json();
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
