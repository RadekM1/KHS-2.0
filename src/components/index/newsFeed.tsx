import { MdRssFeed } from "react-icons/md";
import { BtnArticleShow } from "../blog/btn-article-show";
import { Share } from "../blog/share";
import { newsFetch } from "@/src/lib/server-functions/frontend/news-fetch";

export default async function NewsFeed() {
  const rows = await newsFetch();

  return (
    <div className="scrollbar-thumb-rounded w-full border-gradient-to-r my-6 flex flex-col rounded border-[1px] bg-white dark:bg-zinc-900 from-blue-400 via-purple-500 to-pink-500 py-4 text-center shadow-[0_10px_25px_rgba(0,0,0,0.1),0_10px_50px_rgba(0,0,0,0.2)] scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-400 dark:border-gray-600  dark:scrollbar-track-gray-800 lg:max-h-[600px] lg:overflow-auto">
      <div className="mb-3 flex w-full border-gray-100 pb-2 text-2xl font-bold text-gray-800 dark:text-gray-100">
        <h2 className="mt-3 flex w-full md:text-2xl flex-nowrap gap-2 flex-grow flex-row justify-center">
          <MdRssFeed className="h-8 w-8 self-end text-gray-400" />
          <span>Aktuality</span>
        </h2>
      </div>
      <div className="flex">
        <ul
          aria-label="Novinky"
          role="feed"
          className="relative flex flex-col pl-3 text-sm before:absolute before:left-6 before:top-0 before:h-full before:border-slate-200 after:absolute after:bottom-6 after:left-3 after:top-6 after:-translate-x-1/2 after:border after:border-slate-200 dark:after:border-gray-600"
        >
          {rows.map((item) => (
            <li
              role="article"
              className="relative my-1 pl-3 before:absolute before:left-0 before:top-4 before:z-10 before:h-2 before:w-2 before:-translate-x-1/2 before:rounded-full before:bg-orange-600 before:ring-2 before:ring-white dark:before:bg-gray-600 dark:before:ring-gray-600"
              key={item.id}
            >
              <div className="mr-3 flex flex-1 flex-grow flex-col text-start">
                <h3 className="ml-2 border-t border-gray-200 pt-1 text-xs leading-7 dark:text-orange-300 text-orange-600 dark:border-gray-600  lg:text-base">
                  {item.title}
                </h3>
                <p className="mt ml-2 text-start text-xs text-slate-500 dark:text-gray-300 md:text-sm">
                  {item.summary}
                </p>
                <div className="flex h-full gap-3 mt-2 items-center flex-row justify-end">
                  <Share
                    share={`https://khszlin.com/novinky/${item.id}`}
                    title={item.title}
                  />
                  <BtnArticleShow id={item.id} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
