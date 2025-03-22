"use server";
import pool from "@/src/lib/connection-adapters/pool";
import { executeQuery } from "@/src/lib/connection-adapters/db";
import { CommentsSchema, commentsSchema } from "@/src/schemas/queries/comments";

export const commentsFetch = async (slug:string) => {
  const sqlConnection = await pool.connect();
  try {
    const response = await executeQuery({
      sqlConnection,
      query: `
        SELECT 
        c.id, 
        c.article_slug, 
        c.comment, 
        c.created, 
        u.avatar, 
        u.name, 
        u.nick_name,
        u.account 
        FROM comments c
        JOIN users u 
        ON c.user_account = u.account
        WHERE c.article_slug = $1
      `,
      values: [slug],
    });


    if (!(response.rowCount > 0)) {
      return [];
    }
    const parsedRows: CommentsSchema = commentsSchema.parse(response.rows);

    const data = parsedRows.map((row) => ({
      ...row,
      created: new Date(row.created).toLocaleDateString("cs-CZ")
    }));

    return data;
  } catch (error) {
    console.log("Chyba při načítání novinek:", error);
    return [];
  } finally {
    sqlConnection.release();
  }
};
