import { Response } from "express";

export const setupTokens = (
  res: Response,
  accessToken: string,
  refreshToken: string
) => {
  res.cookie("refreshToken", refreshToken);
  res.cookie("accessToken", accessToken);
};
