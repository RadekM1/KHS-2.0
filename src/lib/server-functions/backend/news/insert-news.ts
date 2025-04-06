"use server";

import pool from "@/src/lib/connection-adapters/pool";
import { executeQuery } from "@/src/lib/connection-adapters/db";
import { ArticleGallerySchema } from "@/src/schemas/queries/articles-dashboard";

export const newsInsert = async (
    title: string,
    editorContent: string,
    account: string,
    summary: string,
    metadataToApi: ArticleGallerySchema, 
    active: boolean,
) => {
    const sqlConnection = await pool.connect();
    try {

        const response = await executeQuery({
          sqlConnection,
          query: "SELECT MAX(id) AS returnedId from news_feed",
        });


        const id = response.rows[0].returnedid ? response.rows[0].returnedid + 1 : 1

        if(!(Number.isInteger(id))){
            return {ok:false, message:'Vrácená hodnota z databáze není celé číslo (integer)'}
        }

      const metadataToSql = metadataToApi.map((object) => ({
        file: `https://storage.googleapis.com/khs-zlin/news-img-gallery/${id}/${object.file}`,
        alt: object.alt,
        description: object.description,
      }));

      const metadataToSqlString = JSON.stringify(metadataToSql);

      const result = await executeQuery({
        sqlConnection,
        query:
          "INSERT INTO news_feed (id, title, clanek, account, summary, active, gallery) VALUES ($1, $2, $3, $4, $5, $6, $7)",
        values: [
          id,
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
            message: 'Nepodařilo se uložit článek',
            ok: false, 
        }
      } 
      return {
        message: "Článek byl úspěšně vytvořen",
        id,
        ok: true,
      };
    } catch (error) {
      console.log("Chyba při přidání článku:", error);
      return {
        message: 'Nepodařilo se uložit článek',
        ok: false, 
    }
    } finally {
      sqlConnection.release();
    }
  }