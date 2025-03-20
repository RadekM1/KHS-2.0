"use server";
import pool from "@/src/lib/connection-adapters/pool";
import { executeQuery } from "@/src/lib/connection-adapters/db";

export const authentication = async (token: string) => {
  const sqlConnection = await pool.connect();
  try {
    await sqlConnection.query("BEGIN");

    const result = await executeQuery({
      sqlConnection,
      query: "SELECT * FROM users WHERE verification_token = $1",
      values: [token],
    });

    if (!(result.rowCount > 0)) {
      return { ok: false, message: "nepodařilo se získat token z databáze" };
    }

    const resultUnlocked = await executeQuery({
      sqlConnection,
      query: `UPDATE users 
                    SET locked = FALSE 
                    WHERE verification_token = $1`,
      values: [token],
    });
    if (!(resultUnlocked.rowCount > 0)) {
      await sqlConnection.query("ROLLBACK");
      return {
        message: "Token se nepodařilo ověřit v databázi",
        ok: false,
      };
    }
    await sqlConnection.query("COMMIT");
    return {
      ok: true,
      message: "Uživatelský účet byl ověřen a odemčen. Můžete se přihlásit",
    };
  } catch (error) {
    console.log(error);
    await sqlConnection.query("ROLLBACK");
    return {
      message: `V průběhu přípravy dat do databáze došlo k chybě`,
      ok: false,
    };
  } finally {
    sqlConnection.release();
  }
};
