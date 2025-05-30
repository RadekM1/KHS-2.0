import { BtnArticleShow } from "@/src/components/blog/btn-article-show";
import { newsFetchAll } from "@/src/lib/server-functions/frontend/news-fetch-all";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Klub horských sportů Zlín - seznam aktualit",
  description: "Seznam aktualit v rámci klubu horských sportů zlín",
  icons: {
    icon: "/favicon.ico",
  },
  keywords: [
    "horolezectví",
    "alpinismus",
    "kurzy alpinismu",
    "skalní lezení",
    "bouldering",
    "kroužek lezení",
    "Horolezecký oddíl Zlín",
    "Klub horských sportů Zlín",
    "Aktuální informace",
  ],
  authors: [{ name: "Radek Morong", url: "https://www.radekmorong.cz" }],
  alternates: {
    canonical: "https://www.khszlin.com/aktuality",
  },
};

export const dynamic = "force-dynamic";

export default async function Page() {
  const rows = await newsFetchAll();

  return (
    <section className="mx-2  w-full mb-10">
      <div className="mx-10 flex items-center justify-center self-center border-gray-100 pb-2 text-2xl font-bold text-gray-600 dark:text-gray-100">
        <h1 className="items-center my-16 font-bold text-2xl md:text-4xl">
          AKTUALITY
        </h1>
      </div>
      <div className="flex w-full">
        <ul
          aria-label="Aktuality"
          role="feed"
          className="relative pb-10 gap-4 flex flex-grow flex-col pl-3 text-sm before:absolute before:left-6 before:top-0 before:h-full before:border-slate-200 after:absolute after:bottom-6 after:left-3 after:top-6 after:-translate-x-1/2 after:border after:border-slate-200 dark:after:border-gray-600"
        >
          {rows.map((item) => (
            <li
              role="article"
              className="relative my-1 lg:my-3 pl-3 before:absolute before:left-0 before:top-4 before:z-10 before:h-2 before:w-2 before:-translate-x-1/2 before:rounded-full before:bg-orange-600 before:ring-2 before:ring-white dark:before:bg-gray-600 dark:before:ring-gray-600"
              key={item.id}
            >
              <article className="mr-3 gap-3 flex flex-1 flex-grow flex-col text-start">
                <h2 className="ml-2 border-t border-gray-200 pt-1 text-xs leading-7 text-orange-600 dark:border-gray-600 dark:text-orange-400 lg:text-base">
                  <span className="mr-5 text-end text-xs text-slate-400">
                    {item.created_time}
                  </span>
                  {item.title}
                </h2>
                <p className="mt ml-2 text-start text-xs text-slate-500 dark:text-gray-300 md:text-sm">
                  {item.summary}
                </p>
                <div className="flex justify-start">
                  <BtnArticleShow id={item.id} />
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
