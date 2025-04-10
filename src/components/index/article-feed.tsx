import { BlogCard } from "../blog/blog-card";
import { articlesCardFetch } from "@/src/lib/server-functions/frontend/articles-fetch";

export const dynamic = "force-dynamic";

export const ArticleFeed = async () => {
  const rows = await articlesCardFetch();

  return (
    <div className="flex flex-col justify-center text-center">
      <div className="mb-2 mt-5 flex w-full justify-center text-center text-2xl font-bold text-gray-700  dark:text-white">
        Nejnovější články
      </div>
      <div className="flex w-full flex-col justify-center text-center">
        {rows.map((item, i) => (
          <BlogCard key={i} data={item} />
        ))}
      </div>
    </div>
  );
};
