"use server";
import pool from "@/src/lib/connection-adapters/pool";
import { executeQuery } from "@/src/lib/connection-adapters/db";
import { SitemapSchema, sitemapSchema } from "@/src/schemas/queries/sitemap";

export const articlesSitemapFetch = async () => {
  const sqlConnection = await pool.connect();
  try {
    const response = await executeQuery({
      sqlConnection,
      query: `
        SELECT 
        slug
      FROM articles 
      `,
    });

    if (!(response.rowCount > 0)) {
      console.log(response);
      console.log("nepodařilo se získat data pro sitemap");
      return [];
    }

    console.log(response.rows);

    const parsedRows: SitemapSchema = sitemapSchema.parse(response.rows);

    console.log(parsedRows);

    return parsedRows;
  } catch (error) {
    console.log("Chyba při načítání novinek:", error);
    return [];
  } finally {
    sqlConnection.release();
  }
};
