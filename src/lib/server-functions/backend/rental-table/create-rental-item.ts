"use server";

import pool from "@/src/lib/connection-adapters/pool";
import { executeQuery } from "@/src/lib/connection-adapters/db";

export const createRentalItem = async (
  productName: string,
  pieces: number,
  isReserved: boolean,
  onStock: boolean,
  whoRented: string,
  whoReserved: string,
) => {
  const sqlConnection = await pool.connect();
  try {
    const isReservedNum = isReserved ? 1 : 0;
    const onStockNum = onStock ? 1 : 0;

    const sqlConnection = await pool.connect();

    const result = await executeQuery({
      sqlConnection,
      query:
        "INSERT INTO rental (item_name, pieces, reserved, on_stock, member_reserved, member_rented) VALUES ($1, $2, $3, $4, $5, $6)",
      values: [
        productName,
        pieces,
        isReservedNum,
        onStockNum,
        whoReserved,
        whoRented,
      ],
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
