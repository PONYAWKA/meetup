import { Router } from "express";

import { userController } from "./controller";

export const userRouter = Router();

userRouter.post("/reg", userController.createUser);
