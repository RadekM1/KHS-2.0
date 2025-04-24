import { z } from "zod";

export const imgInGallerySchema = z.object({
  src: z.string(),
  alt: z.string(),
  media_type: z.string(),
  type: z.string().optional(),
  thumbnail: z.string().nullable(),
});

export type ImgInGallerySchema = z.infer<typeof imgInGallerySchema>;

export const allInGallerySchema = z.array(
  z.object({
    file: z.string(),
    alt: z.string(),
    description: z.string(),
  }),
);
export type AllInGallerySchema = z.infer<typeof allInGallerySchema>;
