import { z } from "zod";

export const rentalRowSchema = z.object({
  id: z.number(),
  item_name: z.string(),
  member_rented: z.string(),
  member_reserved: z.string(),
  on_stock: z.boolean(),
  pieces: z.number(),
  reserved: z.boolean(),
});

export const rentalRowsSchema = z.array(rentalRowSchema);

export type RentalRowsSchema = z.infer<typeof rentalRowsSchema>;
