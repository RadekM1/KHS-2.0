"use server";

import pool from "@/src/lib/connection-adapters/pool";
import { executeQuery } from "@/src/lib/connection-adapters/db";

export const updateRentalItem = async (
  productName: string,
  pieces: number,
  isReserved: boolean,
  onStock: boolean,
  whoRented: string,
  whoReserved: string,
  productId: number,
) => {
  const sqlConnection = await pool.connect();
  try {
    const isReservedNum = isReserved ? 1 : 0;
    const onStockNum = onStock ? 1 : 0;

    const sqlConnection = await pool.connect();

    const result = await executeQuery({
      sqlConnection,
      query:
        "UPDATE rental SET item_name = $1, pieces = $2, reserved = $3, on_stock = $4, member_reserved = $5, member_rented = $6 WHERE id = $7",
      values: [
        productName,
        pieces,
        isReservedNum,
        onStockNum,
        whoReserved,
        whoRented,
        productId,
      ],
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
