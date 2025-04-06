"use server";

import { executeQuery } from "../../connection-adapters/db";
import pool from "../../connection-adapters/pool";
import {
  NewsFeedsSchema,
  newsFeedsSchema,
} from "@/src/schemas/queries/news-feed";

export const newsFetch = async () => {
  const sqlConnection = await pool.connect();
  try {
    const response = await executeQuery({
      sqlConnection,
      query: `SELECT * FROM news_feed
        WHERE active = TRUE
        ORDER BY created_time DESC
        LIMIT 5
        `,
    });

    if (!(response.rowCount > 0)) {
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
