"use server";

import pool from "@/src/lib/connection-adapters/pool";
import { executeQuery } from "@/src/lib/connection-adapters/db";

export const deleteRental = async (id: number) => {
  const sqlConnection = await pool.connect();
  try {
    const result = await executeQuery({
      sqlConnection,
      query: "DELETE FROM rental WHERE id = $1",
      values: [id],
    });
    if (!(result.rowCount > 0)) {
      return {
        ok: false,
        message:
          "chyba při smazání uživatele, zkuste znovu, nebo kontaktujte správce",
      };
    }
    return { ok: true, message: "Předmět smazán" };
  } catch (error) {
    console.log(`Chyba při smazání předmětu: ${error}`);
    return { ok: false, message: "nepodařilo se smazat předmět" };
  } finally {
    sqlConnection.release();
  }
};
