import { z } from "zod";

export const likedBy = z.object({
  account: z.string().optional(),
  nickname: z.string().optional(),
  avatar: z.string().optional(),
});

export const baseCardSchema = z.object({
  slug: z.string(),
  title: z.string(),
  created_time: z.date(),
  description: z.string(),
  thumbnail: z.string().nullable(),
  category: z.string(),
  account: z.string().email(),
  nickname: z.string(),
  avatar: z.string().url(),
  hearts_count: z.number(),
  comments_count: z.number().optional(),
  liked_by: z.array(likedBy).optional(),
});

export const postCardSchema = baseCardSchema.extend({
  created_time: z.date(),
});

export const parsedPostCardSchema = baseCardSchema.extend({
  created_time: z.string(),
});

export const postCardsSchema = z.array(postCardSchema);

export type PostCard = z.infer<typeof postCardSchema>;
export type PostCards = z.infer<typeof postCardsSchema>;
export type ParsedPostCardSchema = z.infer<typeof parsedPostCardSchema>;

export const articleImgSchema = z.object({
  file: z.string(),
  alt: z.string(),
  description: z.string(),
});

export const readyToUploadFilesSchema = z.object({
  alt: z.string(),
  description: z.string(),
  file: z.string(),
  preview: z.string(),
});

export const prepaderArticleImgSchema = z.object({
  src: z.string(),
  media_type: z.string(),
  description: z.string(),
  alt: z.string(),
});

export const defaultArticleSchema = z.object({
  title: z.string(),
  clanek: z.string(),
  thumbnail: z.string().nullable(),
  article_img_gallery: z.array(articleImgSchema).nullable(),
  category: z.string(),
  nickname: z.string(),
  avatar: z.string(),
  description: z.string(),
  slug: z.string(),
});

export const fetchedArticleSchema = defaultArticleSchema.extend({
  article_img_gallery: z.array(articleImgSchema).nullable(),
  created_time: z.date(),
});

export const preparedArticleSchema = defaultArticleSchema.extend({
  article_img_gallery: z.array(prepaderArticleImgSchema).nullable(),
  created_time: z.string(),
});

export type FetchedArticleSchema = z.infer<typeof fetchedArticleSchema>;
export type PreparedArticleSchema = z.infer<typeof preparedArticleSchema>;
export type ReadyToUploadFilesSchema = z.infer<typeof readyToUploadFilesSchema>;
