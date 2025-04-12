"use server";
import pool from "@/src/lib/connection-adapters/pool";
import { executeQuery } from "@/src/lib/connection-adapters/db";
import { emailSchema } from "@/src/schemas/registration";
import { passwordSchema } from "@/src/schemas/registration";
import { hash } from "bcryptjs";
import validator from "validator";
import nodeMailer from "@/src/lib/functions/nodeMailer";
import crypto from "crypto";

interface RegistrationProps {
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  confirmPassword: string;
}

export const registration = async (data: RegistrationProps) => {
  const sqlConnection = await pool.connect();
  try {
    if (
      !emailSchema.safeParse(data.email).success ||
      !passwordSchema.safeParse(data.password).success
    ) {
      return { ok: false, message: "nevyhovující parametry hesla nebo jména" };
    }
    const verification_token = crypto.randomBytes(32).toString("hex");
    const verification_token_expire = new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000,
    ).toISOString();
    const provider = "email";
    const cleanUser = validator.escape(data.email);
    const hashedPassword = await hash(data.password, 12);
    const cleanFirstName = validator.escape(data.firstName);
    const cleanLastName = validator.escape(data.lastName);
    const banStamp = new Date("2022-01-01").toISOString();
    const nickName = `${cleanFirstName} ${cleanLastName.slice(0, 1)}.`;

    const registrationAvatar =
      "https://storage.googleapis.com/khs-zlin/avatars/User-avatar.svg.png";

    const result = await executeQuery({
      sqlConnection,
      query:
        "INSERT INTO users (name, last_name, account, avatar, hash_password, verification_token, verification_token_expire, provider, ban_time_stamp, nick_name) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);",
      values: [
        cleanFirstName,
        cleanLastName,
        cleanUser,
        registrationAvatar,
        hashedPassword,
        verification_token,
        verification_token_expire,
        provider,
        banStamp,
        nickName,
      ],
    });
    if (!(result.rowCount > 0)) {
      return {
        ok: false,
        message:
          "Databáze odmítla uložit zaslané údaje, email již například může být uložený.",
      };
    }

    const confirmLink = `https://new.khszlin.com/login?token=${verification_token}&UserToAuth=${data.email}`;
    const subjectReg = "KHS Zlín - potvrzení registrace";
    const textReg = `Dobrý den, pro potvrzení registrace prosím přejděte na tento odkaz: ${confirmLink}
              S pozdravem, KHS Team`;

    await nodeMailer(cleanUser, subjectReg, textReg);
    return {
      ok: true,
      message:
        "Registrace byla úspěšná, byla odeslána ověřovací zpráva na váš email",
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message:
        "Nespecifikovaná chyba při registraci, email již například může být uložený. Zkuste znovu případně kontaktujte podporu.",
    };
  } finally {
    sqlConnection.release();
  }
};
