import Image from "next/image";
import { Gallery } from "@/src/components/gallery";
import { GiNewspaper } from "react-icons/gi";
import { Share } from "@/src/components/blog/share";
import { CommentComponent } from "./commentComponent";
import { articleFetch } from "@/src/lib/server-functions/frontend/article-fetch";

interface PageProps {
  params: {
    clanek: string;
  };
}

export default async function page({ params }: PageProps) {
  const { clanek } = await params;

  const article = await articleFetch(clanek);
  if (!article) {
    return <div>Článek nenalezen</div>;
  }

  const urlToShare = `https://www.khszlin.com/clanky/${clanek}`;

  return (
    <section className="w-full flex min-h-screen flex-col text-gray-200 dark:text-white items-center text-center">
      <div className="mb-4 flex flex-row items-center justify-start ">
        <h1 className="items-center flex flex-nowrap flex-row text-2xl">
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
          <div className="flex flex-row">
            <div className="my-1">
              {/* 
              <Heart
                likes={lajky}
                heartsList={srdickaSeznam}
                slug={article}
              />
             */}
            </div>
            <div>
              <Share share={urlToShare} title={article.title} />
            </div>
          </div>
        </div>
      </header>
      <article
        className="prose w-full px-4 overflow-hidden text-start dark:border-b-gray-700 dark:text-white"
        dangerouslySetInnerHTML={{ __html: article.clanek }}
      />
      <Gallery gallery={article.article_img_gallery} />
      <CommentComponent slug={clanek} />
    </section>
  );
}
