"use server";

import pool from "@/src/lib/connection-adapters/pool";
import { executeQuery } from "@/src/lib/connection-adapters/db";

export const getUsers = async () => {
  const sqlConnection = await pool.connect();
  try {
    const result = await executeQuery({
      sqlConnection,
      query: `SELECT 
              account, ban_time_stamp, clearance, last_name, locked, name, verification_token_expire
              FROM users
              `,
    });
    if (!(result.rowCount > 0)) {
      return {
        ok: false,
        message: "nepodařilo se stáhnout uživatele z databáze",
      };
    }
    const rows = result.rows;

    return { ok: true, rows };
  } catch (error) {
    console.log(`Chyba při getování: ${error}`);
    return {
      ok: false,
      message: "nepodařilo se stáhnout uživatele",
    };
  } finally {
    sqlConnection.release();
  }
};
