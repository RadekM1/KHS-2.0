import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(8, { message: "Heslo musí mít alespoň 8 znaků." })
  .regex(/(?=.*[A-Z])/, {
    message: "Heslo musí obsahovat alespoň jedno velké písmeno.",
  })
  .regex(/(?=.*\d)/, { message: "Heslo musí obsahovat alespoň jedno číslo." });

export const emailSchema = z.string().email();

export const registrationSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(2, { message: "Jméno musí obsahovat alespoň dva znaky" }),
    lastName: z
      .string()
      .trim()
      .min(2, { message: "Příjmení musí obsahovat alespoň dva znaky" }),
    email: z.string().email({ message: "Email není ve správném formátu" }),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Hesla se neshodují.",
    path: ["confirmPassword"],
  });

export type RegistrationSchema = z.infer<typeof registrationSchema>;
