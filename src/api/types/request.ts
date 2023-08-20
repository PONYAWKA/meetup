import { Request } from "express";
export type APIRequest<T> = Request<unknown, unknown, T>;
