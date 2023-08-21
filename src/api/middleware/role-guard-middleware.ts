import { NextFunction, Request, Response } from "express";

import { ApiError } from "../foundation/error/apiError";
import { Role } from "../types/roles";

export const roleGuardMiddleware =
  (role: Role) => (req: Request, res: Response, next: NextFunction) => {
    const roles = res.locals.user.role as Role[];
    if (!roles.includes(role)) throw ApiError.unAuthorized("Access denied");
    return next();
  };
