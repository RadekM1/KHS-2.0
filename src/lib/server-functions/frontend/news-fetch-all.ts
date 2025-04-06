"use server";

import { executeQuery } from "../../connection-adapters/db";
import pool from "../../connection-adapters/pool";
import {
  NewsFeedsSchema,
  newsFeedsSchema,
} from "@/src/schemas/queries/news-feed";

export const newsFetchAll = async () => {
  const sqlConnection = await pool.connect();
  try {
    const response = await executeQuery({
      sqlConnection,
      query: `SELECT id, title, created_time, summary FROM news_feed
        WHERE active = TRUE
        ORDER BY created_time DESC
        `,
    });
    if (!(response.rowCount > 0)) {
      console.log(response);
      return [];
    }

    const parsedData: NewsFeedsSchema = newsFeedsSchema.parse(response.rows);

    return parsedData.map((row) => ({
      ...row,
      created_time: new Date(row.created_time).toLocaleDateString("cs-CZ"),
    }));
  } catch (error) {
    console.log("zachycená chyba z novinek:", error);
    return [];
  } finally {
    sqlConnection.release();
  }
};
