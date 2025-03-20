import { z } from "zod";

export const emailSchema = z.string().email({ message: "nevyhovující formát" });

export const loginSchema = z.object({
  email: emailSchema,
  password: z
    .string()
    .trim()
    .min(8, { message: "heslo musí obsahovat alespoň 8 znaků" }),
});

export type LoginSchema = z.infer<typeof loginSchema>;
export type EmailSchema = z.infer<typeof emailSchema>;
