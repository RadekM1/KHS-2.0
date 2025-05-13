"use server";
import pool from "@/src/lib/connection-adapters/pool";
import { executeQuery } from "@/src/lib/connection-adapters/db";
import { postCardsSchema, PostCards } from "@/src/schemas/queries/articles";

export const articlesCardFetch = async () => {
  const sqlConnection = await pool.connect();
  try {
    const response = await executeQuery({
      sqlConnection,
      query: `
        SELECT 
        a.article_id,
        a.slug, 
        a.title, 
        a.created_time, 
        a.description, 
        a.thumbnail, 
        a.category, 
        u.account, 
        a.nickname, 
        u.avatar,
        COUNT(DISTINCT h.user_account_heart)::int AS hearts_count,  
        COUNT(DISTINCT c.id)::int AS comments_count,             
        COALESCE(
          jsonb_agg(
            DISTINCT JSONB_BUILD_OBJECT(
              'account', hu.account,
              'nickname', hu.nick_name,
              'avatar', hu.avatar
            )
          ) FILTER (WHERE hu.account IS NOT NULL),
          '[]'::jsonb
        ) AS liked_by  
      FROM articles a
      JOIN users u ON a.user_email = u.account
      LEFT JOIN hearts h ON a.slug = h.article_slug_heart
      LEFT JOIN users hu ON h.user_account_heart = hu.account 
      LEFT JOIN comments c ON a.slug = c.article_slug
      GROUP BY 
        a.slug, a.title, a.created_time, a.description, a.thumbnail, a.category, u.account, a.nickname, u.avatar, a.article_id
      ORDER BY a.article_id DESC
      LIMIT 4;
      `,
    });

    if (!(response.rowCount > 0)) {
      console.log(response);
      console.log("nepodařilo se získat data");
      return [];
    }
    const parsedRows: PostCards = postCardsSchema.parse(response.rows);

    const data = parsedRows.map((row) => ({
      ...row,
      created_time: new Date(row.created_time).toLocaleDateString("cs-CZ"),
      liked_by: row.liked_by ?? [
        {
          account: "",
          nickname: "",
          avatar: "",
        },
      ],
      comments_count: row.comments_count ?? 0,
    }));

    return data;
  } catch (error) {
    console.log("Chyba při načítání novinek:", error);
    return [];
  } finally {
    sqlConnection.release();
  }
};
