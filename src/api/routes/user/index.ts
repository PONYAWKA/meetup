import { Router } from "express";

import { userController } from "./controller";

export const userRouter = Router();

userRouter.get("/a", userController.getUser);
