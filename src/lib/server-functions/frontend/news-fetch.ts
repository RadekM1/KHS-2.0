"use server";

import { executeQuery } from "../../database/db";
import pool from "../../database/pool";
import {
  NewsFeedsSchema,
  newsFeedsSchema,
} from "@/src/schemas/queries/news-feed";

export const newsFetch = async () => {
  const sqlConnection = await pool.connect();
  try {
    const response = await executeQuery({
      sqlConnection,
      query: `SELECT id, title, created_time, description FROM news_feed
        ORDER BY created_time DESC
        LIMIT 5
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
    console.log("zachycená chyba z kalendáře:", error);
    return [];
  } finally {
    sqlConnection.release();
  }
};
