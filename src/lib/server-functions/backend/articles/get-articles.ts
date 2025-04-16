"use server";
import { articlesBackendSchema } from "@/src/schemas/queries/articles-dashboard";
import pool from "@/src/lib/connection-adapters/pool";
import { executeQuery } from "@/src/lib/connection-adapters/db";

export const getArticles = async (clearance: string, account: string) => {
  const queryString =
    clearance === "admin" || clearance === "editor"
      ? "SELECT * FROM articles"
      : `SELECT * FROM articles WHERE user_email = '${account}'`;

  const sqlConnection = await pool.connect();
  try {
    const result = await executeQuery({
      sqlConnection,
      query: queryString,
    });

    if (!(result.rowCount > 0)) {
      return {
        ok: false,
        message: "žádné články v databázi",
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
