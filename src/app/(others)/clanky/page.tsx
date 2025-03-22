
import ArticleList from "@/src/components/blog/articleList";
import { GiNewspaper } from "react-icons/gi";
import { articlesCardFetchAll } from "@/src/lib/server-functions/frontend/articles-fetch-all";
import { H1 } from "@/src/components/typography/h-1";
export default async function page() {
    const fetchedRows = await articlesCardFetchAll()


  return (
    <section className="flex min-h-screen w-full flex-col items-center text-center align-top">
      <header className="mb-4 flex gap-3 flex-row ">
        <GiNewspaper className="mr-3 h-8 w-8 text-gray-600 dark:text-gray-200" />
        <H1 title="Články" />
      </header>
      <section className="flex flex-col">
        <ArticleList importedRows={fetchedRows} />
      </section>
    </section>
  );
}
