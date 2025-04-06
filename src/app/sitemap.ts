import { articlesSitemapFetch } from "../lib/server-functions/frontend/sitemap-articles-fetch";
const ROOT = "https://www.khszlin.com/";

export const dynamic = "force-dynamic";

import type { MetadataRoute } from "next";

const articlesSlug = await articlesSitemapFetch();

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: ROOT,
      lastModified: "2025-04-01",
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${ROOT}aktuality`,
      lastModified: "2025-04-01",
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${ROOT}clanky`,
      lastModified: "2025-04-01",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${ROOT}o-nas/historie-oddilu`,
      lastModified: "2025-04-01",
      changeFrequency: "never",
      priority: 0.4,
    },
    {
      url: `${ROOT}kontakt`,
      lastModified: "2025-04-01",
      changeFrequency: "never",
      priority: 0.6,
    },
    ...articlesSlug.map((item) => ({
      url: `${ROOT}clanky/${item.slug}`,
      lastModified: "2025-04-01",
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
