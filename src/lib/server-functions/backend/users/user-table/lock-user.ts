"use server";

import pool from "@/src/lib/connection-adapters/pool";
import { executeQuery } from "@/src/lib/connection-adapters/db";

export const lockUser = async (account: string, locked: boolean) => {
  const isLocked = locked === true ? 1 : 0;

  console.log(locked);

  const sqlConnection = await pool.connect();
  try {
    const result = await executeQuery({
      sqlConnection,
      query: "UPDATE users SET locked = $1 WHERE account = $2",
      values: [isLocked, account],
    });

    if (!(result.rowCount > 0)) {
      return {
        ok: false,
        message:
          "chyba při zablokování uživatele, zkuste znovu, nebo kontaktujte správce",
      };
    }
    return { ok: true, message: "Stav zablokování změněn" };
  } catch (error) {
    console.log(`Chyba při smazání uživatele: ${error}`);
    return { ok: false, message: "nepodařilo upravit blokační stav uživatele" };
  } finally {
    sqlConnection.release();
  }
};
