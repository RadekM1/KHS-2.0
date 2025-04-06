"use server";

import pool from "@/src/lib/connection-adapters/pool";
import { executeQuery } from "@/src/lib/connection-adapters/db";

export const editEvent = async (
  id: number,
  event: {          
        date: string,
        event: string,
        startTime: string,
        endTime: string,
        checkBoxDayValue: boolean,
        checkBoxNoEndValue: boolean
    }
) => {
    const sqlConnection = await pool.connect();

  try {
    const result = await executeQuery({
        sqlConnection,
        query:
          `
            UPDATE calendar SET date = $1, event = $2 , event_start = $3, event_end = $4, check_whole_day = $5, check_no_end = $6 WHERE id = $7
          `,
        values: [
            event.date,
            event.event,
            event.startTime,
            event.endTime,
            event.checkBoxDayValue,
            event.checkBoxNoEndValue,
            id
        ],
      });


      if (result.rowCount < 1) {
        return {
          ok: false,
          message:
            "chyba při vkládání do databáze, zkuste znovu, nebo kontaktujte správce",
        };
    }
    return { ok: true, message: "Uloženo" };
  } catch (error) {
    console.log(`Chyba při aktualizaci předmětu: ${error}`);
    return { ok: false, message: "Uložení neproběhlo, neočekávaná chyba" };
  } finally {
    sqlConnection.release();
  }
};
