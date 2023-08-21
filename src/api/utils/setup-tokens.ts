import { Response } from "express";

import { accessTokenKey, refreshTokenKey } from "../constants";

export const setupTokens = (
  res: Response,
  accessToken?: string,
  refreshToken?: string
) => {
  res.cookie(refreshTokenKey, refreshToken);
  res.cookie(accessTokenKey, accessToken);
};
