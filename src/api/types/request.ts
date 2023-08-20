import { Request } from "express";
import * as core from "express-serve-static-core";

export type APIRequest<T = unknown> = Request<
  core.ParamsDictionary,
  unknown,
  T
>;
