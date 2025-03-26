"use server";
import pool from "../../connection-adapters/pool";
import { executeQuery } from "../../connection-adapters/db";
import {
  NewsArticleSchema,
  ParsedNewsArticleSchema,
  newsArticleSchema,
} from "@/src/schemas/queries/news-feed";

export const newsArticleFetch = async (id: number) => {
  const sqlConnection = await pool.connect();
  try {
    const response = await executeQuery({
      sqlConnection,
      query: `SELECT * FROM news_feed
            WHERE id = $1
            `,
      values: [id],
    });

    if (!(response.rowCount > 0)) {
      console.log(response);
      console.log("nepodařilo se získat data");
      return null;
    }
    const parsedRow: NewsArticleSchema = newsArticleSchema.parse(
      response.rows[0],
    );

    const preparedData: ParsedNewsArticleSchema = {
      ...parsedRow,
      created_time: new Date(parsedRow.created_time).toLocaleDateString(
        "cs-CZ",
      ),
      gallery: (parsedRow.gallery ?? []).map((item) => {
        return {
          media_type: "image",
          src: item.file,
          description: item.description,
          alt: item.alt,
        };
      }),
    };
    return preparedData;
  } catch (error) {
    console.log("Chyba při načítání článku:", error);
    return null;
  } finally {
    sqlConnection.release();
  }
};
