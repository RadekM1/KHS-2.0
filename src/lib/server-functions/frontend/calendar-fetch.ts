"use server";

import { executeQuery } from "../../connection-adapters/db";
import pool from "../../connection-adapters/pool";
import { CalendarEvents, eventsSchema } from "@/src/schemas/queries/calendar";

export const calendarFetch = async () => {
  const sqlConnection = await pool.connect();
  try {
    const response = await executeQuery({
      sqlConnection,
      query: `
        select * from calendar 
        WHERE date_trunc('month', date) = date_trunc('month',CURRENT_DATE)
        `,
    });
    if (!(response.rowCount > 0)) {
      console.log(response);
      return { ok: false, message: "nepodařilo se získat data" };
    }

    const data: CalendarEvents = eventsSchema.parse(response.rows);
    return { ok: true, data: data };
  } catch (error) {
    console.log("zachycená chyba z kalendáře:", error);
    return { ok: false, message: "nepodařilo se získat data" };
  } finally {
    sqlConnection.release();
  }
};
