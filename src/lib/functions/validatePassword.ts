import { passwordSchema } from "@/src/schemas/registration";

export const validatePassword = (password) => {
  try {
    passwordSchema.parse(password);
    return true;
  } catch (e) {
    return false;
  }
};
