import { ArticleList } from "@/src/components/blog/articleList";
import { GiNewspaper } from "react-icons/gi";
import { articlesCardFetchAll } from "@/src/lib/server-functions/frontend/articles-fetch-all";
import { H1 } from "@/src/components/typography/h-1";
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
      <header className="flex my-10 gap-3 flex-row">
        <GiNewspaper className="mr-3 h-8 w-8 text-gray-600 dark:text-gray-200" />
        <H1 title="Články" />
      </header>
      <section className="flex flex-col">
        <ArticleList importedRows={fetchedRows} />
      </section>
    </section>
  );
}
