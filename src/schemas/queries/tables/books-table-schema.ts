import { z } from "zod";

export const bookRowSchemaFrontend = z.object({
  creator: z.string(),
  description: z.string(),
  id: z.number(),
  name: z.string(),
  on_stock: z.boolean(),
  picture_url: z.string(),
  release: z.string(),
});

export const bookRowSchema = bookRowSchemaFrontend.extend({
  member_rented: z.string(),
});

export const bookRowsSchema = z.array(bookRowSchema);
export const bookRowsSchemaFrontend = z.array(bookRowSchemaFrontend);

export type BookRowsSchema = z.infer<typeof bookRowsSchema>;
export type BookRowsSchemaFrontend = z.infer<typeof bookRowsSchemaFrontend>;