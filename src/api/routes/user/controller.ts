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

    validateRequest(body, PostRegNewUserDTO, next);

    try {
      await userService.reg(name, password, res, role);
    } catch (e) {
      return next(e);
    }
    return res.json();
  }

  async logIn(
    { body }: APIRequest<GetLogIn>,
    res: Response,
    next: NextFunction
  ) {
    const { name, password } = body;

    const validate = validateRequest(body, GetLogInDTO, next);
    if (validate) return validate;

    try {
      await userService.logIn(name, password, res);
    } catch (e) {
      return next(e);
    }
    return res.json();
  }

  async refresh(_req: APIRequest, res: Response, next: NextFunction) {
    try {
      await userService.refresh(res);
      return res.status(200).json();
    } catch (e) {
      return next(e);
    }
  }

  async logOut(_req: APIRequest, res: Response, next: NextFunction) {
    try {
      await userService.logOut(res);
      return res.status(200).json();
    } catch (e) {
      return next(e);
    }
  }
}

export const userController = new UserController();
