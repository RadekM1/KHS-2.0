"use server";

import pool from "@/src/lib/connection-adapters/pool";
import { executeQuery } from "@/src/lib/connection-adapters/db";
import validator from "validator";
import { hash } from "bcryptjs";

export const changePassword = async (password: string, token: string) => {
  const sqlConnection = await pool.connect();
  try {
    await sqlConnection.query("BEGIN");
    const cleanPassword = validator.escape(password);
    const cleanToken = validator.escape(token);
    if (!cleanPassword || !cleanToken) {
      return { message: "nebyly správně předány parametry", ok: false };
    }
    const result = await executeQuery({
      sqlConnection,
      query: "SELECT * FROM users WHERE reset_token = $1",
      values: [cleanToken],
    });

    if (!(result.rows.length > 0)) {
      return { message: "token nesouhlasí", ok: false };
    }

    const tokenFromDatabase = result.rows[0].reset_token;
    const expirationDate = new Date(result.rows[0].reset_token_exp);
    const nowDate = new Date();

    if (!(tokenFromDatabase === cleanToken)) {
      return { message: "token z databáze nesouhlasí", ok: false };
    }

    if (!(expirationDate > nowDate)) {
      return {
        message: "token je sice správný, nicméně platnost již vypršela",
        ok: false,
      };
    }

    const newHashedPassword = await hash(cleanPassword, 12);
    const updateResult = await executeQuery({
      sqlConnection,
      query:
        "UPDATE users SET hash_password = $1, reset_token = NULL, reset_token_exp = NULL WHERE reset_token = $2 ",
      values: [newHashedPassword, cleanToken],
    });

    if (!(updateResult.rowCount > 0)) {
      await sqlConnection.query("ROLLBACK");
      return {
        message:
          "token je platný a správný, nicméně se nepodařilo aktualizovat heslo",
        ok: false,
      };
    }
    await sqlConnection.query("COMMIT");
    return {
      message: "změna hesla proběhla v pořádku, můžete se přihlásit",
      ok: true,
    };
  } catch (error) {
    await sqlConnection.query("ROLLBACK");
    console.log(error);
    return {
      message: `nepodařilo se obnovit heslo, zkuste znovu nebo kontaktujte podporu`,
      ok: false,
    };
  } finally {
    sqlConnection.release();
  }
};
