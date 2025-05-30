import { Share } from "@/src/components/blog/share";
import { newsArticleFetch } from "@/src/lib/server-functions/frontend/news-article-fetch";
import { Gallery } from "@/src/components/gallery";

interface PageProps {
  params: {
    aktualita: number;
  };
}

export default async function Page({ params }: PageProps) {
  const { aktualita } = params;

  const article = await newsArticleFetch(aktualita);
  if (!article) {
    return <div>Článek nenalezen</div>;
  }

  const urlToShare = `https://new.khszlin.com/clanky/${aktualita}`;

  return (
    <section className="w-full flex min-h-screen flex-col text-gray-600 dark:text-white items-center text-center">
      <h1 className="items-center my-4 mt-12 flex flex-nowrap flex-row text-3xl">
        {article.title}
      </h1>
      <header className="flex w-full mt-10 px-4 flex-row">
        <div className="flex gap-5 bg-gray-100 dark:bg-zinc-800 rounded-xl p-4 flex-shrink flex-col text-start">
          <div className="text-xs md:text-sm"></div>
          <div className="my-1 text-xs  md:text-sm">
            <span className="font-semibold">Datum: </span>
            {article.created_time}
          </div>
          <div className="flex flex-row">
            <Share share={urlToShare} title={article.title} />
          </div>
        </div>
      </header>
      <article
        className="prose prose-h2:text-xl mt-10 prose-h1:text-2xl w-full px-4 overflow-hidden text-start dark:border-b-gray-700 dark:text-white"
        dangerouslySetInnerHTML={{ __html: article.clanek }}
      />
      <Gallery
        gallery={(article.gallery ?? []).map((item) => ({
          ...item,
          thumbnail: null,
        }))}
      />
    </section>
  );
}
