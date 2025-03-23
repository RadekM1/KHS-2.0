import { z } from "zod";

export const imgInGallerySchema = z.object({
  src: z.string(),
  alt: z.string(),
  media_type: z.string(),
  type: z.string().optional(),
  thumbnail: z.string().optional(),
});

export type ImgInGallerySchema = z.infer<typeof imgInGallerySchema>;
