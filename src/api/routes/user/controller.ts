import { Request, Response } from "express";

class UserController {
  async getUser(req: Request, res: Response) {
    res.json("user");
  }
}

export const userController = new UserController();
