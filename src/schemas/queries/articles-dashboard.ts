import { z } from "zod";

import { articleImgSchema } from "./articles";

export const articleBackendSchema = z.object({
  article_id: z.number(),
  slug: z.string(),
  title: z.string(),
  clanek: z.string(),
  user_email: z.string(),
  created_time: z.date(),
  description: z.string().nullable(),
  thumbnail: z.string().nullable(),
  article_img_gallery: z.array(articleImgSchema).nullable(),
  category: z.string(),
  nickname: z.string(),
});

export const articleGallerySchema = z.array(articleImgSchema);

export const articlesBackendSchema = z.array(articleBackendSchema);

export type ArticlesBackendSchema = z.infer<typeof articlesBackendSchema>;
export type ArticleGallerySchema = z.infer<typeof articleGallerySchema>;
