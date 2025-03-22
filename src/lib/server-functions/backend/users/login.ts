"use server";
import { executeQuery } from "@/src/lib/connection-adapters/db";
import pool from "@/src/lib/connection-adapters/pool";
import { validateEmail } from "@/src/lib/functions/validateEmail";
import { validatePassword } from "@/src/lib/functions/validatePassword";
import validator from "validator";
import { compare } from "bcryptjs";

export const login = async (email: string, password: string) => {
  const sqlConnection = await pool.connect();
  try {
    if (!validateEmail(email) || !validatePassword(password)) {
      throw new Error("Nevhodné heslo nebo jméno");
    }

    const cleanUser = validator.escape(email);
    const cleanPassword = validator.escape(password);

    let wrongPassCount = 0;

    const result = await executeQuery({
      sqlConnection,
      query: "SELECT * FROM users WHERE account = $1",
      values: [cleanUser],
    });

    if (result.rows.length === 0) {
      throw new Error("Uživatel v databázi nenalezen");
    }

    const row = result.rows[0];
    const isBlocked = new Date(row.ban_time_stamp);

    const passFromDatabase = row.hash_password;
    const locked = row.locked;

    if (locked) {
      throw new Error("Neautorizovaný účet");
    }

    if (!isNaN(isBlocked.getTime()) && isBlocked > new Date()) {
      throw new Error("Účet je stále zablokován");
    }

    const passEqual = await compare(cleanPassword, passFromDatabase);

    if (!passEqual) {
      const resWrongPass = await executeQuery({
        sqlConnection,
        query:
          "UPDATE users SET wrong_pass_check = wrong_pass_check + 1 WHERE account = $1 RETURNING wrong_pass_check",
        values: [cleanUser],
      });

      wrongPassCount = parseInt(resWrongPass.rows[0].wrong_pass_check);

      if (wrongPassCount >= 5) {
        await executeQuery({
          sqlConnection,
          query: `
            UPDATE users SET 
            ban_time_stamp = NOW() + INTERVAL '10 minutes'
            WHERE account = $1`,
          values: [cleanUser],
        });
        throw new Error(
          "Účet byl z bezpečnostních důvodů na 10 minut zablokován, velký počet neplatných pokusů o přihlášení",
        );
      }
      throw new Error("Nesprávné heslo");
    }

    await executeQuery({
      sqlConnection,
      query:
        "UPDATE users SET wrong_pass_check = 0 WHERE account = $1 RETURNING wrong_pass_check",
      values: [cleanUser],
    });

    const user = {
      id: row.id.toString(),
      email: cleanUser,
      avatar: row.avatar,
      clearance: row.clearance,
      firstName: row.name,
      lastName: row.last_name,
      nickName: row.nick_name
    };

    return user
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Neznámá chyba");
  } finally {
    sqlConnection.release();
  }
};
