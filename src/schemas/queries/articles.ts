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
  thumbnail: z.string().url(),
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
