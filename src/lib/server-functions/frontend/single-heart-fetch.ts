"use server";
import pool from "@/src/lib/connection-adapters/pool";
import { executeQuery } from "@/src/lib/connection-adapters/db";
import { SingleHeartSchema, singleHeartSchema, ParsedSingleHeartSchema } from "@/src/schemas/queries/heart";

export const singleHeartFetch = async (slug:string) => {

    const emptyHeartData = {
      likes: 0,
      liked_by: null,
      slug: slug
    }

    const sqlConnection = await pool.connect();
    try {
      const response = await executeQuery({
        sqlConnection,
        query: `
          SELECT 
          a.slug, 
          COUNT(DISTINCT h.user_account_heart)::int AS hearts_count,            
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
        WHERE slug = $1
        GROUP BY 
          a.slug
        `,
        values: [slug]
      });
  
      if (!(response.rowCount > 0)) {
        console.log(response);
        console.log("nepodařilo se získat data");
        return emptyHeartData;
      }
      const parsedRows: SingleHeartSchema = singleHeartSchema.parse(response.rows[0]);
  
      const data: ParsedSingleHeartSchema = {
        likes: parsedRows.hearts_count,
        slug: parsedRows.slug,
        liked_by: parsedRows.liked_by ?? []
      }
  
      return data;
    } catch (error) {
      console.log("Chyba při načítání novinek:", error);
      return emptyHeartData;
    } finally {
      sqlConnection.release();
    }
  };
  