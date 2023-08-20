import { NextFunction, Request, Response } from "express";

import { JWTToken } from "../utils/jwt";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const JWT = res.locals.cookie["accessToken"];
  try {
    const data = JWTToken.verifyAccessToken(JWT);
    res.locals.user = data;
    next();
  } catch (e) {
    next(e);
  }
};
