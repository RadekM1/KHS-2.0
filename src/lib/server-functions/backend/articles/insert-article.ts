"use server";

import pool from "@/src/lib/connection-adapters/pool";
import { executeQuery } from "@/src/lib/connection-adapters/db";
import { ArticleGallerySchema } from "@/src/schemas/queries/articles-dashboard";

export const articleInsert = async (
  slug: string,
  title: string,
  editorContent: string,
  account: string,
  description: string,
  thumbnail: string,
  metadataToApi: ArticleGallerySchema,
  category: string,
  nickName: string,
) => {
  const sqlConnection = await pool.connect();
  try {
    let slugExists = true;
    let i = 1;

    while (slugExists) {
      const checkSlugResult = await executeQuery({
        sqlConnection,
        query: "SELECT EXISTS(SELECT 1 FROM articles WHERE slug = $1)",
        values: [slug],
      });

      if (checkSlugResult.rows[0].exists) {
        slug = `${slug}-${i++}`;
      } else {
        slugExists = false;
      }
    }

    const metadataToSql = metadataToApi.map((object) => ({
      file: `https://storage.googleapis.com/khs-zlin/img-gallery/${slug}/${object.file}`,
      alt: object.alt,
      description: object.description,
    }));

    const metadataToSqlString = JSON.stringify(metadataToSql);

    const prepairedThumbNailUrl = metadataToApi
      ? `https://storage.googleapis.com/khs-zlin/img-gallery/${slug}/${thumbnail}`
      : "https://storage.googleapis.com/khs-zlin/card-fallback.svg";

    const result = await executeQuery({
      sqlConnection,
      query:
        "INSERT INTO articles (slug, title, clanek, user_email, description, thumbnail, article_img_gallery, category, nickname) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
      values: [
        slug,
        title,
        editorContent,
        account,
        description,
        prepairedThumbNailUrl,
        metadataToSqlString,
        category,
        nickName,
      ],
    });

    if (!(result.rowCount > 0)) {
      return {
        message: "Nepodařilo se uložit článek",
        ok: false,
        slug: "",
      };
    }
    await fetch(`https://new.khszlin.com/clanky/${slug}`);

    return {
      message: "Článek byl úspěšně vytvořen",
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
