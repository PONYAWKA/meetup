import { Request } from "express";
export type APIRequest<T = unknown> = Request<unknown, unknown, T>;
