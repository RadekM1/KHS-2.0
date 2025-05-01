"use server";

import pool from "@/src/lib/connection-adapters/pool";
import { executeQuery } from "@/src/lib/connection-adapters/db";

export const createRentalItem = async (productName: string, pieces: number) => {
  const sqlConnection = await pool.connect();
  try {
    const sqlConnection = await pool.connect();

    const result = await executeQuery({
      sqlConnection,
      query: "INSERT INTO rental (item_name, pieces) VALUES ($1, $2)",
      values: [productName, pieces],
    });

    if (!(result.rowCount > 0)) {
      return {
        ok: false,
        message:
          "chyba při vkládání do databáze, zkuste znovu, nebo kontaktujte správce",
      };
    }

    return { ok: true, message: "Předmět uložen" };
  } catch (error) {
    console.log(`Chyba při aktualizaci předmětu: ${error}`);
    return { ok: false, message: "nepodařilo se vložit předmět" };
  } finally {
    sqlConnection.release();
  }
};
