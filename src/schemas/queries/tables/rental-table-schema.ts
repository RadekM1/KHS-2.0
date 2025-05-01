import { z } from "zod";

export const rentalRowFrontEnd = z.object({
  id: z.number(),
  item_name: z.string(),
  pieces: z.number(),
});

export const rentalRowsSchema = z.array(rentalRowFrontEnd);
export const rentalRowsFrontEndSchema = z.array(rentalRowFrontEnd);

export type RentalRowsSchema = z.infer<typeof rentalRowsSchema>;
export type RentalRowsFrontEndSchema = z.infer<typeof rentalRowsFrontEndSchema>;
