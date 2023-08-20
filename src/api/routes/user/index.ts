import { Router } from "express";

import { userController } from "./controller";

export const userRouter = Router();

userRouter.post("/reg", userController.createUser);
userRouter.get("/login", userController.logIn);
userRouter.get("/refresh", userController.refresh);
userRouter.get("/logout", userController.logOut);
