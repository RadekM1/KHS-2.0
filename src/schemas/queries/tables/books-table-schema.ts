import { z } from "zod";

export const bookRowSchema = z.object({
  creator: z.string(),
  description: z.string(),
  id: z.number(),
  member_rented: z.string(),
  name: z.string(),
  on_stock: z.boolean(),
  picture_url: z.string(),
  release: z.string(),
});

export const bookRowsSchema = z.array(bookRowSchema);

export type BookRowsSchema = z.infer<typeof bookRowsSchema>;
