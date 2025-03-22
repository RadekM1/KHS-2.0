import pool from "@/src/lib/connection-adapters/pool";
import { executeQuery } from "@/src/lib/connection-adapters/db";
import Image from "next/image";
import { Heart } from "@/src/components/blog/heart";
import { Gallery } from "@/src/components/gallery";
import { GiNewspaper } from "react-icons/gi";
import { Share } from "@/src/components/blog/share";
import { CommentComponent } from "./commentComponent";

export const revalidate = 3600;

export default async function page({ params }) {
  const article = params.clanek;

  let category = "";

  const sqlConnection = await pool.connect();
  let rows = [];
  let heartsResult = null;

  try {
    const result = await executeQuery({
      sqlConnection,
      query: `
          SELECT a.title, a.clanek, a.created_time, a.thumbnail, a.article_img_gallery, a.category, a.nickname, u.avatar
          FROM articles a
          JOIN users u ON a.user_email = u.account
          WHERE a.slug = $1
        `,
      values: [article],
    });

    rows = result.rows.map((row) => ({
      ...row,
      created_time: new Date(row.created_time).toLocaleDateString("cs-CZ"),
    }));

    if (rows.length === 0) {
      return <div>Novinka nenalezena</div>;
    }

    heartsResult = await executeQuery({
      sqlConnection,
      query: `
          SELECT COUNT(DISTINCT h.user_account_heart) AS likes,
                 ARRAY_AGG(DISTINCT h.user_account_heart) AS heartsList,
                 h.article_slug_heart AS slug
          FROM hearts h
          WHERE h.article_slug_heart = $1
          GROUP BY h.article_slug_heart
        `,
      values: [article],
    });
  } catch (error) {
    console.error("Chyba při načítání novinek:", error.message);
  } finally {
    sqlConnection.release();
  }

  switch (rows[0].category) {
    case "skaly":
      category = "skály";
      break;
    case "hory":
      category = "hory";
      break;
    case "oddil":
      category = "oddíl";
      break;
    case "ostatni":
      category = "ostatní";
      break;
    default:
      category = "Neznámá kategorie";
      break;
  }

  const heartsInput = heartsResult.rows;
  const srdickaSeznam =
    heartsInput.length > 0 && heartsInput[0].heartslist
      ? heartsInput[0].heartslist
      : [];
  const lajky = heartsInput.length > 0 ? heartsInput[0].likes : 0;

  const urlToShare = `/clanky/${article}`;

  return (
    <div className="mx-1 flex min-h-screen flex-col items-center overflow-x-hidden text-center md:mx-3 lg:mx-10">
      <div className="mb-4 flex flex-row items-center justify-start border-b-[1px] border-b-gray-300 dark:border-b-gray-700">
        <div className="items-center">
          <GiNewspaper className="mr-3 h-8 w-8 text-gray-500 dark:text-gray-200" />
        </div>
        <div className="text-2xl text-gray-500 dark:text-gray-200">
          {rows[0].title}
        </div>
      </div>
      <div className="flex w-full flex-row">
        <div className="mb-4 flex flex-grow flex-col text-start">
          <div className="text-xs text-gray-500 md:text-sm">
            <div className="flex flex-row">
              <div className="mr-2">
                <Image
                  width={30}
                  height={30}
                  alt="avatar uživatele"
                  src={rows[0].avatar}
                  className="inline-block h-6 w-6 self-center rounded-full object-fill ring-2 ring-white dark:ring-[#1E1E1E]"
                />
              </div>
              <div>{rows[0].nickname}</div>
            </div>
          </div>
          <div className="my-1 text-xs text-gray-500 md:text-sm">
            Datum: {rows[0].created_time}
          </div>
          <div className="my-1 text-xs text-gray-500 md:text-sm">
            kategorie: {category}
          </div>
          <div className="flex flex-row">
            <div className="my-1">
              <Heart
                likes={lajky}
                heartsList={srdickaSeznam}
                slug={article}
              />
            </div>
            <div>
              <Share share={urlToShare} title={rows[0].title} />
            </div>
          </div>
        </div>
      </div>
      <div className="mx-2 mb-4 w-full flex-wrap overflow-hidden border-b-[1px] border-b-gray-300 bg-gray-50 py-1 pb-4 pl-2 dark:border-b-gray-700 dark:bg-[#1E1E1E]">
        <div
          className="prose mb-4 mr-10 w-full max-w-full overflow-hidden whitespace-pre-line break-words break-all border-b-[1px] border-b-gray-300 pb-4 text-start dark:border-b-gray-700 dark:text-white"
          dangerouslySetInnerHTML={{ __html: rows[0].clanek }}
        />
        <Gallery await dataIn={rows[0].article_img_gallery} />
      </div>
      <div>
        <CommentComponent article={article} />
      </div>
    </div>
  );
}
