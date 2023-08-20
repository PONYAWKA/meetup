import { Router } from "express";

import { meetupController } from "./controller";

export const meetupRouter = Router();

meetupRouter.get("/all", meetupController.getAll);
meetupRouter.get("/create", meetupController.create);
meetupRouter.get("/get", meetupController.get);
