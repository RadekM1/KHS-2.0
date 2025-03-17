import { emailSchema } from "@/src/schemas/registration";

export const validateEmail = (email: string) => {
  return emailSchema.safeParse(email).success;
};
