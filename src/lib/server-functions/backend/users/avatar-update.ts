"use server";

import pool from "@/src/lib/connection-adapters/pool";
import { executeQuery } from "@/src/lib/connection-adapters/db";

export const updateAvatarInSql = async (avatar: string, account: string) => {
  const sqlConnection = await pool.connect();

  try {
    const result = await executeQuery({
      sqlConnection,
      query: "UPDATE users SET avatar = $1 WHERE account = $2",
      values: [avatar, account],
    });

    if (!(result.rowCount > 0)) {
      return {
        ok: false,
        message:
          "chyba při aktualizaci obrázku v databázi, zkuste znovu, nebo kontaktujte správce",
      };
    }
    const rows = result.rows;

    return { ok: true, rows };
  } catch (error) {
    console.log(`Chyba při aktualizaci obrázku: ${error}`);
    return { ok: false, message: "nepodařilo se aktualizovat obrázek" };
  } finally {
    sqlConnection.release();
  }
};
