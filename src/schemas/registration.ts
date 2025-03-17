import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(8, { message: "Heslo musí mít alespoň 8 znaků." })
  .regex(/(?=.*[A-Z])/, {
    message: "Heslo musí obsahovat alespoň jedno velké písmeno.",
  })
  .regex(/(?=.*\d)/, { message: "Heslo musí obsahovat alespoň jedno číslo." });

export const emailSchema = z.string().email();

export const userSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, { message: "Jméno musí obsahovat alespoň dva znaky" }),
  lastName: z
    .string()
    .trim()
    .min(2, { message: "Příjmení musí obsahovat alespoň dva znaky" }),
  user: z.string().email(),
  password: passwordSchema,
});

export type UserSchema = z.infer<typeof userSchema>;
