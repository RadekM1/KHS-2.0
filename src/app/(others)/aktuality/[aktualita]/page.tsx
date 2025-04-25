import { Share } from "@/src/components/blog/share";
import { newsArticleFetch } from "@/src/lib/server-functions/frontend/news-article-fetch";
import { Gallery } from "@/src/components/gallery";

interface PageProps {
  params: {
    aktualita: number;
  };
}

export default async function page({ params }: PageProps) {
  const { aktualita } = await params;

  const article = await newsArticleFetch(aktualita);
  if (!article) {
    return <div>Článek nenalezen</div>;
  }

  const urlToShare = `https://new.khszlin.com/clanky/${aktualita}`;

  return (
    <section className="w-full flex min-h-screen flex-col text-gray-800 dark:text-white items-center text-center">
      <h1 className="items-center my-4 flex flex-nowrap flex-row text-3xl">
        {article.title}
      </h1>
      <header className="flex w-full px-4 flex-row">
        <div className="mb-4 flex flex-grow flex-col text-start">
          <div className="text-xs md:text-sm"></div>
          <div className="my-1 text-xs  md:text-sm">
            Datum: {article.created_time}
          </div>
          <div className="flex flex-row">
            <Share share={urlToShare} title={article.title} />
          </div>
        </div>
      </header>
      <article
        className="prose prose-h2:text-xl prose-h1:text-2xl w-full px-4 overflow-hidden text-start dark:border-b-gray-700 dark:text-white"
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
