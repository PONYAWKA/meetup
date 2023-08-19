import { Pool } from "pg";
export const DB = new Pool({
  user: "postgress",
  password: "123",
  host: "localhost",
  port: 5432,
  database: "node",
});
