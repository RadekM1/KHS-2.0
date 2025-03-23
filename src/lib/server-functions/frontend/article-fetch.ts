"use server";
import pool from "../../connection-adapters/pool";
import { executeQuery } from "../../connection-adapters/db";
import { categoryObject } from "@/src/static-objects/objects/categories";
import {
  FetchedArticleSchema,
  PreparedArticleSchema,
  fetchedArticleSchema,
} from "@/src/schemas/queries/articles";

export const articleFetch = async (slug: string) => {
  const sqlConnection = await pool.connect();
  try {
    const response = await executeQuery({
      sqlConnection,
      query: `
      SELECT a.title, a.clanek, a.created_time, a.description, a.slug, a.thumbnail, a.article_img_gallery, a.category, a.nickname, u.avatar
      FROM articles a
      JOIN users u ON a.user_email = u.account
      WHERE a.slug = $1
    `,
      values: [slug],
    });

    if (!(response.rowCount > 0)) {
      console.log(response);
      console.log("nepodařilo se získat data");
      return null;
    }
    if (!fetchedArticleSchema.safeParse(response.rows[0]).success) {
      return null;
    }

    const parsedRows: FetchedArticleSchema = response.rows[0];

    const categoryRow = categoryObject.find(
      (object) => object.id === response.rows[0].category,
    );
    const foundedCategory = categoryRow?.label ?? "";

    const preparedData: PreparedArticleSchema = {
      ...parsedRows,
      created_time: new Date(parsedRows.created_time).toLocaleDateString(
        "cs-CZ",
      ),
      category: foundedCategory,
      article_img_gallery: (parsedRows.article_img_gallery ?? []).map((item) => {
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
