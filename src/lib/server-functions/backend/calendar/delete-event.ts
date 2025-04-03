"use server";

import pool from "@/src/lib/connection-adapters/pool";
import { executeQuery } from "@/src/lib/connection-adapters/db";

export const deleteEvent = async (id: number) => {
  const sqlConnection = await pool.connect();
  try {
    const result = await executeQuery({
      sqlConnection,
      query: "DELETE FROM calendar WHERE id = $1",
      values: [id],
    });
    if (!(result.rowCount > 0)) {
      return {
        ok: false,
        message:
          "chyba při smazání události, zkuste znovu, nebo kontaktujte správce",
      };
    }
    return { ok: true, message: "událost smazána" };
  } catch (error) {
    console.log(`Chyba při smazání článku: ${error}`);
    return { ok: false, message: "nepodařilo se smazat článek" };
  } finally {
    sqlConnection.release();
  }
};
