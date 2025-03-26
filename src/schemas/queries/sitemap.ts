import { z } from "zod";

export const sitemapSchema = z.array(
  z.object({
    slug: z.string(),
  }),
);

export type SitemapSchema = z.infer<typeof sitemapSchema>;
