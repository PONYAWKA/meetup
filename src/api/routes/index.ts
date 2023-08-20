import { Router } from "express";

import { authMiddleware } from "../middleware/auth-middleware";
import { meetupRouter } from "./meetups";
import { userRouter } from "./user";

export const apiRouter = Router();

apiRouter.use("/user", userRouter);
apiRouter.use("/meetup", authMiddleware, meetupRouter);
