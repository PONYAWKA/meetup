import { NextFunction, Request, Response } from "express";

import { JWTToken } from "../utils/jwt";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const JWT = res.locals.cookie["accessToken"];
  try {
    JWTToken.verifyAccessToken(JWT);
    next();
  } catch (e) {
    return res.status(401);
  }
};
