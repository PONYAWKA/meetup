import { NextFunction, Request, Response } from "express";

import { ApiError } from "../foundation/error/apiError";
import { JWTToken } from "../foundation/jwt/jwt";

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
  } catch (e: any) {
    next(e as ApiError);
  }
};
