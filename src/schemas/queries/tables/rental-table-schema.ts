import { z } from "zod";

export const rentalRowFrontEnd = z.object({
  id: z.number(),
  item_name: z.string(),
  on_stock: z.boolean(),
  pieces: z.number(),
  reserved: z.boolean(),
});

export const rentalRowSchema = rentalRowFrontEnd.extend({
  member_rented: z.string(),
  member_reserved: z.string(),
});

export const rentalRowsSchema = z.array(rentalRowSchema);
export const rentalRowsFrontEndSchema = z.array(rentalRowFrontEnd);

export type RentalRowsSchema = z.infer<typeof rentalRowsSchema>;
export type RentalRowsFrontEndSchema = z.infer<typeof rentalRowsFrontEndSchema>;
