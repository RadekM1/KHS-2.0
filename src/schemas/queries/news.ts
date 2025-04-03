import { z } from "zod";

import { articleImgSchema } from "./articles";

export const newsArticleSchema = z.object({
  id: z.number(),
  title: z.string(),
  clanek: z.string(),
  account: z.string(),
  created_time: z.date(),
  expiration_date: z.date(),
  summary: z.string(),
  gallery: z.array(articleImgSchema).nullable(),
});

export const newsArticlesSchema = z.array(newsArticleSchema);

export type NewsArticlesSchema = z.infer<typeof newsArticlesSchema>;
