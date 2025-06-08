import { AvatarCover } from "./avatar-cover";
import { Gallery } from "@/src/components/gallery";
import { Share } from "@/src/components/blog/share";
import { CommentComponent } from "./commentComponent";
import { articleFetch } from "@/src/lib/server-functions/frontend/article-fetch";
import { HeartFetchCover } from "./heartFetchCover";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ clanek: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { clanek } = await params;
  const article = await articleFetch(clanek);
  const url = `https://khszlin.com/clanky/${article?.slug}`;
  const imageUrl =
    article?.thumbnail ||
    "https://storage.googleapis.com/khs-zlin/card-fallback.svg";

  return {
    title: article?.title || "KHS ZLín - Článek",
    description: article?.description || "",
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: article?.title,
      description: article?.description,
      url,
      images: [imageUrl],
      siteName: "KHS Zlín",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: article?.title,
      description: article?.description,
      images: [imageUrl],
    },
  };
}

export const dynamic = "force-dynamic";

const Page = async ({ params }: { params: Promise<{ clanek: string }> }) => {
  const { clanek } = await params;

  const article = await articleFetch(clanek);

  if (!article) {
    return <div>Článek nenalezen</div>;
  }

  const htmlWithHttps = article.clanek.replace(
    /src="http:\/\//g,
    'src="https://',
  );

  const urlToShare = `https://khszlin.com/clanky/${clanek}`;

  return (
    <section className="w-full flex min-h-screen flex-col text-gray-600 dark:text-white items-center text-center">
      <h1 className="items-center my-10 flex flex-nowrap flex-row text-3xl font-bold">
        {article.title}
      </h1>
      <header className="flex w-full px-4 flex-row">
        <div className="mb-4 bg-gray-100 dark:bg-zinc-700 p-6 rounded-xl gap-4 flex flex-shrink flex-col text-start">
          <div className="text-xs md:text-sm">
            <div className="flex flex-row">
              <div className="mr-2">
                <AvatarCover avatar={article.avatar} />
              </div>
              <div>{article.nickname}</div>
            </div>
          </div>
          <div className="my-1 text-xs  md:text-sm">
            <span className="font-semibold">Datum: </span>
            {article.created_time}
          </div>
          <div className="my-1 text-xs  md:text-sm">
            <span className="font-semibold">Kategorie: </span>
            {article.category}
          </div>
          <div className="flex -ml-3 gap-3 h-full">
            <HeartFetchCover slug={clanek} />
            <Share share={urlToShare} title={article.title} />
          </div>
        </div>
      </header>
      <article
        className="prose prose-h2:text-xl mt-10 prose-h1:text-2xl w-full px-4 text-start text-gray-700 dark:text-white"
        dangerouslySetInnerHTML={{ __html: htmlWithHttps }}
      />
      <Gallery
        gallery={(article.article_img_gallery ?? []).map((img) => ({
          ...img,
          thumbnail: null,
          type: undefined,
          alt: img.description,
        }))}
      />
      <CommentComponent slug={clanek} />
    </section>
  );
};
export default Page;
