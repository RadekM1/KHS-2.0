"use server";

import pool from "@/src/lib/connection-adapters/pool";
import { executeQuery } from "@/src/lib/connection-adapters/db";

export const insertEvents = async (
  events: {
    date: string;
    event: string;
    startTime: string;
    endTime: string;
    checkBoxDayValue: boolean;
    checkBoxNoEndValue: boolean;
  }[],
) => {
  const sqlConnection = await pool.connect();
  let failedCount = 0;
  try {
    await sqlConnection.query("BEGIN");

    for (const event of events) {
      const result = await executeQuery({
        sqlConnection,
        query: `
                INSERT INTO calendar (date, event, event_start, event_end, check_whole_day, check_no_end)
                VALUES ($1, $2, $3, $4, $5, $6)
              `,
        values: [
          event.date,
          event.event,
          event.startTime,
          event.endTime,
          event.checkBoxDayValue,
          event.checkBoxNoEndValue,
        ],
      });

      if (!(result.rowCount > 0)) {
        failedCount++;
      }
    }
    if (failedCount > 0) {
      await sqlConnection.query("ROLLBACK");
      return {
        ok: false,
        message:
          "chyba při vkládání do databáze, zkuste znovu, nebo kontaktujte správce",
      };
    }
    await sqlConnection.query("COMMIT");

    return { ok: true, message: "Uloženo" };
  } catch (error) {
    await sqlConnection.query("ROLLBACK");
    console.log(`Chyba při aktualizaci předmětu: ${error}`);
    return { ok: false, message: "Uložení neproběhlo, neočekávaná chyba" };
  } finally {
    sqlConnection.release();
  }
};
