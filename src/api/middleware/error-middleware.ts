import { Request, Response } from "express";

import { ApiError } from "../foundation/error/apiError";

export const errorMiddleware = (
  err: ApiError | Error,
  req: Request,
  res: Response
) => {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message });
  }
  return res.status(500).json({ message: "unexpected error", err });
};
