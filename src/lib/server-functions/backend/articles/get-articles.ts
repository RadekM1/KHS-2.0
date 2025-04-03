"use server";
import { articlesBackendSchema } from "@/src/schemas/queries/articles-dashboard";
import pool from "@/src/lib/connection-adapters/pool";
import { executeQuery } from "@/src/lib/connection-adapters/db";

export const getArticles = async () => {
  const sqlConnection = await pool.connect();
  try {
    const result = await executeQuery({
      sqlConnection,
      query: `SELECT * FROM articles
              `,
    });

    if (!(result.rowCount > 0)) {
      return {
        ok: false,
        message: "nepodařilo se stáhnout články z databáze",
        rows: [],
      };
    }

    const rows = articlesBackendSchema.parse(result.rows);

    return { ok: true, rows };
  } catch (error) {
    console.log(`Chyba při getování: ${error}`);
    return {
      ok: false,
      rows: [],
      message: "nepodařilo se stáhnout články",
    };
  } finally {
    sqlConnection.release();
  }
};
