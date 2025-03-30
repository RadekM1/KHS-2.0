"use server";

import pool from "@/src/lib/connection-adapters/pool";
import { executeQuery } from "@/src/lib/connection-adapters/db";

export const getRentals = async () => {
  const sqlConnection = await pool.connect();
  try {
    const result = await executeQuery({
      sqlConnection,
      query: `SELECT * FROM rental
              `,
    });
    if (!(result.rowCount > 0)) {
      return {
        ok: false,
        message: "nepodařilo se stáhnout data půjčovny z databáze",
      };
    }
    const rows = result.rows;

    return { ok: true, rows };
  } catch (error) {
    console.log(`Chyba při getování: ${error}`);
    return {
      ok: false,
      message: "nepodařilo se stáhnout data půjčovny",
    };
  } finally {
    sqlConnection.release();
  }
};
