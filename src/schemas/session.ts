import { z } from "zod";
export const sessionUserSchema = z.object({
  avatar: z.string(),
  clearance: z.string(),
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
});

export const sessionSchema = z.object({
  expires: z.string(),
  user: sessionUserSchema,
});

export type SessionSchema = z.infer<typeof sessionSchema>;
export type SessionUserSchema = z.infer<typeof sessionUserSchema>;
