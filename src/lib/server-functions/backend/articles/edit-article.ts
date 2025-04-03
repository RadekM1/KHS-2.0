"use server";

import pool from "@/src/lib/connection-adapters/pool";
import { executeQuery } from "@/src/lib/connection-adapters/db";

export const editArticle = async (
    idToEdit: number,
    title: string,
    slug: string,
    editorContent: string,
    description: string,
    thumbnail: string,
    gallery: string, 
    category: string,
) => {
    const sqlConnection = await pool.connect();
    try {

      const result = await executeQuery({
        sqlConnection,
        query:
          "UPDATE articles SET title = $2, clanek = $3, description = $4, thumbnail = $5, article_img_gallery = $6, category = $7 WHERE article_id = $1",
        values: [
          idToEdit,
          title,
          editorContent,
          description,
          thumbnail,
          gallery,
          category,
        ],
      });

      if (!(result.rowCount > 0)) {
        return {
          message: 'Nepodařilo se aktualizovat článek',
          ok: false, 
          slug: ''
        }
      } 
      return {
        message: "Článek byl úspěšně aktualizován",
        slug,
        ok: true,
      };
    } catch (error) {
      console.log("Chyba při přidání článku:", error);
      return {
        message: 'Nepodařilo se uložit článek',
        ok: false, 
        slug: ''
    }
    } finally {
      sqlConnection.release();
    }
  }