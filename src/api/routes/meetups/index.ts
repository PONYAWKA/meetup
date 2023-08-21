import { Router } from "express";
import { roleGuardMiddleware } from "src/api/middleware/role-guard-middleware";
import { Role } from "src/api/types/roles";

import { meetupController } from "./controller";

export const meetupRouter = Router();

meetupRouter.post("", roleGuardMiddleware(Role.Admin), meetupController.create);
meetupRouter.get("", meetupController.get);
meetupRouter.patch(
  "/:id",
  roleGuardMiddleware(Role.Admin),
  meetupController.update
);
meetupRouter.delete(
  "/:id",
  roleGuardMiddleware(Role.Admin),
  meetupController.delete
);
