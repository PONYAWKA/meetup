import { ValidationError } from "class-validator";
import { NextFunction, Request, Response } from "express";

import { ApiError } from "../foundation/error/apiError";

export const errorMiddleware = (
  err: ApiError | Error | ValidationError[],
  req: Request | Response,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  if (err instanceof ApiError) {
    return res.status(err.status).json();
  }
  if ("status" in req) return req.status(404).json("wrong way");

  if (err instanceof ValidationError)
    return res.status(400).json({ validationError: err });
  return res.status(500).json(err);
};
