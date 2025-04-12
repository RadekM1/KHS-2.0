"use server";
import pool from "@/src/lib/connection-adapters/pool";
import { executeQuery } from "@/src/lib/connection-adapters/db";
import { validateEmail } from "@/src/lib/functions/validateEmail";
import validator from "validator";
import crypto from "crypto";
import nodeMailer from "@/src/lib/functions/nodeMailer";

export const resetPassword = async (email: string) => {
  const sqlConnection = await pool.connect();
  try {
    await sqlConnection.query("BEGIN");
    const cleanEmail = validator.escape(email);

    if (!validateEmail(cleanEmail)) {
      return { message: "Nevhodné parametry", ok: false };
    }

    const result = await executeQuery({
      sqlConnection,
      query: "SELECT * FROM users WHERE account = $1",
      values: [cleanEmail],
    });

    if (!(result.rowCount > 0)) {
      return { ok: false, message: "nepodařilo se obnovit heslo" };
    }

    const row = result.rows[0];
    const userFromDatabase = row.account;

    if (!(userFromDatabase === cleanEmail)) {
      return { ok: false, message: "uživatel nenalezen v databázi" };
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpire = new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000,
    ).toISOString();

    const resultUpdated = await executeQuery({
      sqlConnection,
      query:
        "UPDATE users SET reset_token = $1, reset_token_exp = $2 WHERE account = $3",
      values: [resetToken, resetTokenExpire, cleanEmail],
    });

    if (!(resultUpdated.rowCount > 0)) {
      await sqlConnection.query("ROLLBACK");
      return {
        ok: false,
        message: "nepodařilo se aktualizovat data v databázi",
      };
    }

    const resetLink = `https://new.khszlin.com/obnova-hesla?token=${resetToken}`;
    const subject = "KHS Zlín - obnova hesla";
    const text = `Dobrý den, pro obnovu hesla prosím přejděte na tento odkaz: ${resetLink}
            S pozdravem, KHS Team`;

    await nodeMailer(cleanEmail, subject, text);
    await sqlConnection.query("COMMIT");
    return {
      message: "Na váš email byla odeslána zpráva pro obnovu hesla",
      ok: true,
    };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "nespecifikovaná chyba při obnově hesla" };
  } finally {
    sqlConnection.release();
  }
};
