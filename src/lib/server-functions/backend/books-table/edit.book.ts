"use server";

import pool from "@/src/lib/connection-adapters/pool";
import { executeQuery } from "@/src/lib/connection-adapters/db";

export const bookEdit = async (
  id: number,
  name: string,
  creator: string,
  onStock: boolean,
  whoRented: string,
  release: string,
  description: string,
  isImage: boolean,
) => {
  const sqlConnection = await pool.connect();
  try {
    const bookImgUrl = isImage
      ? `https://storage.googleapis.com/khs-zlin/books/${id}.jpg`
      : "";

    const result = await executeQuery({
      sqlConnection,
      query: `
                UPDATE books SET name = $1, creator = $2, on_stock = $3, member_rented = $4, release = $5, picture_url = $6, description = $7
                WHERE id = $8
            `,
      values: [
        name,
        creator,
        onStock,
        whoRented,
        release,
        bookImgUrl,
        description,
        id,
      ],
    });

    if (!(result.rowCount > 0)) {
      return {
        message: "Nepodařilo se aktualizovat knížku",
        ok: false,
      };
    }

    return {
      message: "Knížka aktualizována",
      ok: true,
    };
  } catch (error) {
    console.log("Chyba při přidání knížky:", error);
    return {
      message: "Nepodařilo se atualizovat knížku",
      ok: false,
    };
  } finally {
    sqlConnection.release();
  }
};
