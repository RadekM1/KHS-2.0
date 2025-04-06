"use server";

import pool from "@/src/lib/connection-adapters/pool";
import { executeQuery } from "@/src/lib/connection-adapters/db";

export const deleteBook = async (id: number) => {
  const sqlConnection = await pool.connect();
  try {
    const result = await executeQuery({
      sqlConnection,
      query: "DELETE FROM books WHERE id = $1",
      values: [id],
    });
    if (!(result.rowCount > 0)) {
      return {
        ok: false,
        message:
          "chyba při smazání knihy, zkuste znovu, nebo kontaktujte správce",
      };
    }
    return { ok: true, message: "kniha smazána" };
  } catch (error) {
    console.log(`Chyba při smazání knihy: ${error}`);
    return { ok: false, message: "nepodařilo se smazat knihu" };
  } finally {
    sqlConnection.release();
  }
};
