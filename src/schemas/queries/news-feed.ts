import { z } from "zod";
import { articleImgSchema, prepaderArticleImgSchema } from "./articles";


export const newsFeedSchemaCard = z.object({
  id: z.number(),
  title: z.string(),
  created_time: z.date(),
  description: z.string(),
});

export const newsFeedsSchema = z.array(newsFeedSchemaCard);

export type NewsFeedSchema = z.infer<typeof newsFeedSchemaCard>;
export type NewsFeedsSchema = z.infer<typeof newsFeedsSchema>;


export const newsArticleSchema = z.object({
  id: z.number(),
  title: z.string(),
  created_time: z.date(),
  description: z.string(),
  gallery: z.array(articleImgSchema).nullable(),
  active: z.boolean()
})

export const parsedNewsArticleSchema = z.object({
  id: z.number(),
  title: z.string(),
  created_time: z.string(),
  description: z.string(),
  gallery: z.array(prepaderArticleImgSchema).nullable(),
  active: z.boolean()
})

export type NewsArticleSchema = z.infer<typeof newsArticleSchema>
export type ParsedNewsArticleSchema = z.infer<typeof parsedNewsArticleSchema>