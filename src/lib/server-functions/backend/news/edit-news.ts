"use server";

import pool from "@/src/lib/connection-adapters/pool";
import { executeQuery } from "@/src/lib/connection-adapters/db";
import { ArticleGallerySchema } from "@/src/schemas/queries/articles-dashboard";

export const editArticleNews = async (
    idToEdit: number,
    title: string,
    editorContent: string,
    account: string,
    summary: string,
    metadataToApi: ArticleGallerySchema, 
    active: boolean,
) => {
    const sqlConnection = await pool.connect();
    try {


    const metadataToSqlString = JSON.stringify(metadataToApi);

    const result = await executeQuery({
      sqlConnection,
      query:
        "UPDATE news_feed SET title = $2, clanek = $3, account = $4, summary = $5, active = $6, gallery = $7 WHERE id = $1",
      values: [
        idToEdit,
        title,
        editorContent,
        account,
        summary,
        active,
        metadataToSqlString,
      ],
    });

    if (!(result.rowCount > 0)) {
      return {
          message: 'Nepodařilo se upravit článek',
          ok: false, 
      }
    } 
    return {
      message: "Článek byl úspěšně upraven",
      idToEdit,
      ok: true,
    };
  } catch (error) {
    console.log("Chyba při úpravě článku:", error);
    return {
      message: 'Nepodařilo se upravit článek',
      ok: false, 
  }
  } finally {
    sqlConnection.release();
  }
  }