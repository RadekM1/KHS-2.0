import { z } from "zod";

export const forgotenSchema = z.object({
  email: z.string().email({ message: "nevyhovující formát" }),
});

export type ForgotenSchema = z.infer<typeof forgotenSchema>;
