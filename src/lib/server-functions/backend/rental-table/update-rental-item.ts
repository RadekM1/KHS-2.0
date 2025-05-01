"use server";

import pool from "@/src/lib/connection-adapters/pool";
import { executeQuery } from "@/src/lib/connection-adapters/db";

export const updateRentalItem = async (
  productName: string,
  pieces: number,
  productId: number,
) => {
  const sqlConnection = await pool.connect();
  try {
    const sqlConnection = await pool.connect();

    const result = await executeQuery({
      sqlConnection,
      query: "UPDATE rental SET item_name = $1, pieces = $2 WHERE id = $3",
      values: [productName, pieces, productId],
    });

    if (!(result.rowCount > 0)) {
      return {
        ok: false,
        message:
          "chyba při aktualizaci v databázi, zkuste znovu, nebo kontaktujte správce",
      };
    }

    return { ok: true, message: "Předmět aktualizován" };
  } catch (error) {
    console.log(`Chyba při aktualizaci předmětu: ${error}`);
    return { ok: false, message: "nepodařilo se aktualizovat předmět" };
  } finally {
    sqlConnection.release();
  }
};
