"use server";

import pool from "@/src/lib/connection-adapters/pool";
import { executeQuery } from "@/src/lib/connection-adapters/db";

export const deleteUser = async (account: string) => {
  const sqlConnection = await pool.connect();
  try {
    const result = await executeQuery({
      sqlConnection,
      query: "DELETE FROM users WHERE account = $1",
      values: [account],
    });
    if (!(result.rowCount > 0)) {
      return {
        ok: false,
        message:
          "chyba při smazání uživatele, zkuste znovu, nebo kontaktujte správce",
      };
    }
    return { ok: true, message: "Uživatel smazán" };
  } catch (error) {
    console.log(`Chyba při smazání uživatele: ${error}`);
    return { ok: false, message: "nepodařilo se smazat uživatele" };
  } finally {
    sqlConnection.release();
  }
};
