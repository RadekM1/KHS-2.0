import { z } from "zod";

export const newsFeedSchema = z.object({
  id: z.number(),
  title: z.string(),
  created_time: z.date(),
  description: z.string(),
});

export const newsFeedsSchema = z.array(newsFeedSchema);

export type NewsFeedSchema = z.infer<typeof newsFeedSchema>;
export type NewsFeedsSchema = z.infer<typeof newsFeedsSchema>;
