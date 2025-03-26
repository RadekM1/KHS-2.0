import { z } from "zod";
import { likedBy } from "./articles";

export const singleHeartSchema = z.object({
  hearts_count: z.number(),
  liked_by: z.array(likedBy).optional(),
  slug: z.string(),
});

export const parsedSingleHeartSchema = z.object({
  likes: z.number(),
  liked_by: z.array(likedBy).optional(),
  slug: z.string(),
});

export type SingleHeartSchema = z.infer<typeof singleHeartSchema>;
export type ParsedSingleHeartSchema = z.infer<typeof parsedSingleHeartSchema>;
