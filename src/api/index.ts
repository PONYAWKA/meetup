import cookieParser from "cookie-parser";
import env from "dotenv";
import express from "express";

import { apiRouter } from "./routes";

const app = express();
const port = process.env.PORT ?? 3000;
env.config();

app.use(express.json());
app.use(cookieParser());
app.use("/api", apiRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
