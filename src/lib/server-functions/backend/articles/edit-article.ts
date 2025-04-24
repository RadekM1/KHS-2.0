"use server";

import pool from "@/src/lib/connection-adapters/pool";
import { executeQuery } from "@/src/lib/connection-adapters/db";
import { revalidatePath } from "next/cache";

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
  const prepairedThumbNailUrl = gallery
    ? thumbnail
    : "https://storage.googleapis.com/khs-zlin/card-fallback.svg";
  const sqlConnection = await pool.connect();
  try {
    const result = await executeQuery({
      sqlConnection,
      query: `UPDATE articles SET title = $2, clanek = $3, description = $4, thumbnail = $5, article_img_gallery = $6, category = $7 WHERE article_id = $1`,
      values: [
        idToEdit,
        title,
        editorContent,
        description,
        prepairedThumbNailUrl,
        gallery,
        category,
      ],
    });

    if (!(result.rowCount > 0)) {
      return {
        message: "Nepodařilo se aktualizovat článek",
        ok: false,
        slug: "",
      };
    }
    await revalidatePath(`/clanky/${slug}`);
    await fetch(`https://new.khszlin.com/clanky/${slug}`);
    return {
      message: "Článek byl úspěšně aktualizován",
      slug,
      ok: true,
    };
  } catch (error) {
    console.log("Chyba při přidání článku:", error);
    return {
      message: "Nepodařilo se uložit článek",
      ok: false,
      slug: "",
    };
  } finally {
    sqlConnection.release();
  }
};
