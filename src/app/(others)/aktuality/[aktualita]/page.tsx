import { MdRssFeed } from "react-icons/md";
import { Share } from "@/src/components/blog/share";
import { newsArticleFetch } from "@/src/lib/server-functions/frontend/news-article-fetch";
import { Gallery } from "@/src/components/gallery";

interface PageProps {
  params: {
    aktualita: number;
  };
}

export default async function page({ params } : PageProps) {
  const slug = params.aktualita

  const article = await newsArticleFetch(slug);
  if (!article) {
    return <div>Článek nenalezen</div>;
  }

  const urlToShare = `https://www.khszlin.com/clanky/${slug}`;

  return (
   <section className="w-full flex min-h-screen flex-col text-gray-800 dark:text-white items-center text-center">
         <div className="mb-4 flex flex-row items-center justify-start ">
           <h1 className="items-center flex flex-nowrap flex-row text-2xl">
             <MdRssFeed className="mr-3 h-8 w-8 " />
             {article.title}
           </h1>
         </div>
         <header className="flex w-full px-4 flex-row">
           <div className="mb-4 flex flex-grow flex-col text-start">
             <div className="text-xs md:text-sm">
             </div>
             <div className="my-1 text-xs  md:text-sm">
               Datum: {article.created_time}
             </div>
             <div className="flex flex-row">
                <Share share={urlToShare} title={article.title} />
             </div>
           </div>
         </header>
         <article
           className="prose w-full px-4 overflow-hidden text-start dark:border-b-gray-700 dark:text-white"
           dangerouslySetInnerHTML={{ __html: article.description }}
         />
         <Gallery gallery={article.gallery ?? []} />
       </section>
 
  );
}
