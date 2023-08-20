// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();
import "reflect-metadata";
import "es6-shim";

import cookieParser from "cookie-parser";
import express from "express";

import { errorMiddleware } from "./middleware/error-middleware";
import { parseCookie } from "./middleware/parse-cookie-middleware";
import { apiRouter } from "./routes";
import { getBuildEnv } from "./utils/get-build-env";

const app = express();
const port = getBuildEnv("PORT");

app.use(express.json());
app.use(cookieParser());
app.use(parseCookie);
app.use("/api", apiRouter);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});

app.use(errorMiddleware);
