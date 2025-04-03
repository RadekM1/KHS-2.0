"use server";

import pool from "@/src/lib/connection-adapters/pool";
import { executeQuery } from "@/src/lib/connection-adapters/db";

export const deleteNewsArticle = async (id: number) => {
  const sqlConnection = await pool.connect();
  try {
    const result = await executeQuery({
      sqlConnection,
      query: "DELETE FROM news_feed WHERE id = $1",
      values: [id],
    });
    if (!(result.rowCount > 0)) {
      return {
        ok: false,
        message:
          "chyba při smazání článku, zkuste znovu, nebo kontaktujte správce",
      };
    }
    return { ok: true, message: "novinka smazána" };
  } catch (error) {
    console.log(`Chyba při smazání novinky: ${error}`);
    return { ok: false, message: "nepodařilo se smazat novinku" };
  } finally {
    sqlConnection.release();
  }
};
