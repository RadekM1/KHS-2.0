import Image from "next/image";
import { Gallery } from "@/src/components/gallery";
import { GiNewspaper } from "react-icons/gi";
import { Share } from "@/src/components/blog/share";
import { CommentComponent } from "./commentComponent";
import { articleFetch } from "@/src/lib/server-functions/frontend/article-fetch";
import { HeartFetchCover } from "./heartFetchCover";
import type { Metadata } from "next";
import { articlesSitemapFetch } from "@/src/lib/server-functions/frontend/sitemap-articles-fetch";

type Props = {
  params: Promise<{ clanek: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { clanek } = await params;
  const article = await articleFetch(clanek);
  return {
    title: article?.title || "KHS ZLín - Článek",
    description: article?.description || "",
    keywords: [
      "horolezectví",
      "alpinismus",
      "kurzy lezení",
      "skalní lezení",
      "bouldering",
      "horolezectví Zlín",
      "zprávy o lezení",
      "klub horských sportů Zlín",
    ],
    alternates: {
      canonical: `https://www.khszlin.com/clanky/${article?.slug}`,
    },
  };
}

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  const articles = await articlesSitemapFetch();
  return articles.map((article) => {
    return {
      clanek: article.slug,
    };
  });
}

const Page = async ({ params }: { params: Promise<{ clanek: string }> }) => {
  const { clanek } = await params;

  const article = await articleFetch(clanek);

  if (!article) {
    return <div>Článek nenalezen</div>;
  }

  const urlToShare = `https://www.khszlin.com/clanky/${clanek}`;

  return (
    <section className="w-full flex min-h-screen flex-col text-gray-800 dark:text-white items-center text-center">
      <div className="flex flex-row items-center justify-start ">
        <h1 className="items-center my-10 flex flex-nowrap flex-row text-2xl">
          <GiNewspaper className="mr-3 h-8 w-8 " />
          {article.title}
        </h1>
      </div>
      <header className="flex w-full px-4 flex-row">
        <div className="mb-4 flex flex-grow flex-col text-start">
          <div className="text-xs md:text-sm">
            <div className="flex flex-row">
              <div className="mr-2">
                <Image
                  width={30}
                  height={30}
                  alt="avatar uživatele"
                  src={article.avatar}
                  className="inline-block h-6 w-6 self-center rounded-full object-fill ring-2 ring-white dark:ring-[#1E1E1E]"
                />
              </div>
              <div>{article.nickname}</div>
            </div>
          </div>
          <div className="my-1 text-xs  md:text-sm">
            Datum: {article.created_time}
          </div>
          <div className="my-1 text-xs  md:text-sm">
            kategorie: {article.category}
          </div>
          <div className="flex gap-3 h-full">
            <HeartFetchCover slug={clanek} />
            <Share share={urlToShare} title={article.title} />
          </div>
        </div>
      </header>
      <article
        className="prose w-full px-4 text-start text-gray-800 dark:text-white"
        dangerouslySetInnerHTML={{ __html: article.clanek }}
      />
      <Gallery gallery={article.article_img_gallery ?? []} />
      <CommentComponent slug={clanek} />
    </section>
  );
};
export default Page;
