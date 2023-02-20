import * as pg from "pg";

const { Pool } = pg;
const pool = new Pool({
  user: "home",
  password: "",
  host: "localhost",
  port: 5432,
  database: "cafe",
});

export default pool;
