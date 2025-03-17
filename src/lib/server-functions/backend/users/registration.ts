"use server";
import pool from "@/src/lib/database/pool";
import { executeQuery } from "@/src/lib/database/db";
import { emailSchema } from "@/src/schemas/registration";
import { passwordSchema } from "@/src/schemas/registration";
import { UserSchema } from "@/src/schemas/registration";
import { hash } from "bcryptjs";
import validator from "validator";
import nodeMailer from "@/src/lib/functions/nodeMailer";
import crypto from "crypto";

export const registration = async (user: UserSchema) => {
  const sqlConnection = await pool.connect();
  try {
    if (
      !emailSchema.safeParse(user.user).success ||
      !passwordSchema.safeParse(user.password).success
    ) {
      return { ok: false, message: "nevyhovující parametry hesla nebo jména" };
    }
    const verification_token = crypto.randomBytes(32).toString("hex");
    const verification_token_expire = new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000,
    ).toISOString();
    const provider = "email";
    const cleanUser = validator.escape(user.user);
    const hashedPassword = await hash(user.password, 12);
    const cleanFirstName = validator.escape(user.firstName);
    const cleanLastName = validator.escape(user.lastName);
    const banStamp = new Date("2022-01-01").toISOString();
    const nickName = `${cleanFirstName} ${cleanLastName.slice(0, 1)}.`;

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

    if (result.rowCount > 0) {
      const confirmLink = `https://khs-zlin.vercel.app/login?token=${verification_token}&UserToAuth=${user.user}`;
      const subjectReg = "KHS Zlín - potvrzení registrace";
      const textReg = `Dobrý den, pro potvrzení registrace prosím přejděte na tento odkaz: ${confirmLink}
                S pozdravem, KHS Team`;

      await nodeMailer(cleanUser, subjectReg, textReg);
      return {
        ok: true,
        message:
          "Registrace byla úspěšná, byla odeslána ověřovací zpráva na váš email",
      };
    } else {
      return {
        ok: false,
        message: "Registrace nebyla úspěšná, email již může být v databázi",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message:
        "Nespecifikovaná chyba při registraci, zkuste znovu případně kontaktujte podporu",
    };
  } finally {
    sqlConnection.release();
  }
};
