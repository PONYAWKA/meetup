import { Router } from "express";
import { roleGuardMiddleware } from "src/api/middleware/role-guard-middleware";
import { Role } from "src/api/types/roles";

import { meetupController } from "./controller";

export const meetupRouter = Router();

meetupRouter.get("/all", meetupController.getAll);
meetupRouter.post(
  "/create",
  roleGuardMiddleware(Role.Admin),
  meetupController.create
);
meetupRouter.get("/get", meetupController.get);
meetupRouter.put(
  "/update/:id",
  roleGuardMiddleware(Role.Admin),
  meetupController.update
);
meetupRouter.delete(
  "/delete/:id",
  roleGuardMiddleware(Role.Admin),
  meetupController.delete
);
