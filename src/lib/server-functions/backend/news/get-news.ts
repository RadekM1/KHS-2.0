"use server";

import pool from "@/src/lib/connection-adapters/pool";
import { executeQuery } from "@/src/lib/connection-adapters/db";
import { newsArticlesSchema } from "@/src/schemas/queries/news";

export const getNews = async () => {
  const sqlConnection = await pool.connect();
  try {
    const result = await executeQuery({
      sqlConnection,
      query: `SELECT * FROM news_feed
              `,
    });

    
    if (!(result.rowCount > 0)) {
      return {
        ok: false,
        message: "nepodařilo se stáhnout novinky z databáze",
        rows:[]
      };
    }
    const rows = newsArticlesSchema.parse(result.rows);

    return { ok: true, rows: rows };
  } catch (error) {
    console.log(`Chyba při getování: ${error}`);
    return {
      ok: false,
      message: "nepodařilo se stáhnout data novinek",
      rows: []
    };
  } finally {
    sqlConnection.release();
  }
};
