"use server";

import pool from "@/src/lib/connection-adapters/pool";
import { executeQuery } from "@/src/lib/connection-adapters/db";

export const updateUserClearance = async (
  account: string,
  clearance: string,
) => {
  const sqlConnection = await pool.connect();

  try {
    const result = await executeQuery({
      sqlConnection,
      query: "UPDATE users SET clearance = $1 WHERE account = $2",
      values: [clearance, account],
    });

    if (!(result.rowCount > 0)) {
      return {
        ok: false,
        message:
          "chyba při aktualizaci oprávnění v databázi, zkuste znovu, nebo kontaktujte správce",
      };
    }

    return { ok: true, message: "Oprávnění aktualizováno" };
  } catch (error) {
    console.log(`Chyba při aktualizaci oprávnění: ${error}`);
    return { ok: false, message: "nepodařilo se aktualizovat oprávnění" };
  } finally {
    sqlConnection.release();
  }
};
