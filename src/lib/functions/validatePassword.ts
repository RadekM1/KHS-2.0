import { passwordSchema } from "@/src/schemas/registration";

export const validatePassword = (password: string) => {
  return passwordSchema.safeParse(password).success;
};
