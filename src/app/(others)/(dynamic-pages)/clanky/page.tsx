import { ArticleList } from "@/src/components/blog/articleList";
import { articlesCardFetchAll } from "@/src/lib/server-functions/frontend/articles-fetch-all";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Klub horských sportů Zlín - seznam článků",
  description:
    "Seznam článků z výprav od členů oddílu, reporty z klubových akcí",
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
  ],
  authors: [{ name: "Radek Morong", url: "https://www.radekmorong.cz" }],
  alternates: {
    canonical: "https://www.khszlin.com/clanky",
  },
};

export default async function page() {
  const fetchedRows = await articlesCardFetchAll();

  return (
    <section className="flex min-h-screen w-full flex-col items-center text-center align-top">
      <h1 className="items-center my-16 font-bold text-2xl md:text-4xl">
        ČLÁNKY
      </h1>
      <section className="flex flex-col">
        <ArticleList importedRows={fetchedRows} />
      </section>
    </section>
  );
}
