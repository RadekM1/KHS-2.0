import { Pool } from "pg";

const pool = new Pool({
  user: process.env.active_user,
  host: process.env.active_host,
  database: process.env.active_database,
  password: process.env.active_password,
  port: process.env.active_port ? parseInt(process.env.active_port) : undefined,
  max: 40,
  connectionTimeoutMillis: 4000,
  idleTimeoutMillis: 30000,
  statement_timeout: 4000,
  allowExitOnIdle: false,
});

export default pool;
