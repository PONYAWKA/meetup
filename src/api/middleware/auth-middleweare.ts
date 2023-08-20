import { NextFunction, Request, Response } from "express";

import { JWTToken } from "../utils/jwt";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const JWT = req.headers.authorization?.split(" ")[1] as string;
  try {
    JWTToken.verifyAccessToken(JWT);
    next();
  } catch (e) {
    res.status(401);
  }
};
