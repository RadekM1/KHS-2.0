import { z } from "zod";
import { passwordSchema } from "./registration";

export const restorePassSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Hesla se neshodují.",
    path: ["confirmPassword"],
  });

export type RestorePassSchema = z.infer<typeof restorePassSchema>;
