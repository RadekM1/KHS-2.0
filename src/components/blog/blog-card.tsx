import Image from "next/image";
import Link from "next/link";
import { Heart } from "./heart";
import { Share } from "./share";
import { FaRegComment } from "react-icons/fa";
import { ParsedPostCardSchema } from "@/src/schemas/queries/articles";

export const BlogCard = ({ data }: { data: ParsedPostCardSchema }) => {
  const tempShortDescription = `${data.description.slice(0, 100)}...`;
  const share = `https://www.khszlin.com/clanky/${data.slug}`;
  const slug = data.slug;

  return (
    <div className="mt-4 flex flex-col max-w-[800px] md:mt-2">
      <article className="flex flex-row flex-wrap rounded border border-gray-200 bg-white shadow-lg transition-shadow duration-500 hover:shadow-lg ease-in-out  dark:hover:shadow-zinc-700 hover:shadow-gray-400 dark:border-gray-600 dark:bg-zinc-800  md:m-2">
        <Link href={`/clanky/${data.slug}`}>
          <div className="mx-auto flex flex-row space-y-3 p-1 transition-opacity duration-300  md:flex-row md:space-x-5 md:space-y-0">
            <div className="w-1/3 max-w-[200px] relative h-[110px] md:h-[150px] self-start bg-white px-3 py-1 pl-2 dark:bg-zinc-800">
              <Image
                src={data.thumbnail}
                alt={data.title}
                className="flex w-full h-full self-start rounded object-cover"
                width={250}
                height={100}
              />
            </div>
            <div className="flex w-2/3 flex-col justify-start bg-white dark:bg-zinc-800">
              <header className="w-full">
                <h2 className="-mt-2 text-start text-xs font-black text-gray-700 dark:text-gray-300 md:mt-2 md:text-base">
                  {data.title}
                </h2>
                <div className="flex gap-2 flex-row flex-nowrap">
                  <div className="mt-1 flex flex-row overflow-hidden">
                    <Image
                      width={30}
                      height={30}
                      alt={`úvodní obrázek z článku na téma: ${data.title}`}
                      src={data.avatar}
                      className="inline-block h-6 w-6 self-center rounded-full object-fill ring-2 ring-white dark:ring-[#1E1E1E]"
                    />
                  </div>
                  <div className="mx-2 flex self-center text-xs text-gray-500 dark:text-gray-500">
                    {data.nickname}
                  </div>
                  <div className="mx-2 flex self-center text-xs text-gray-500 dark:text-gray-500">
                    {data.created_time}
                  </div>
                </div>
              </header>
              <p className="mt-3 hidden text-start text-xs text-gray-500 dark:text-gray-200 sm:block md:text-sm">
                {data.description}
              </p>
              <p className="mt-1 block text-start text-xs text-gray-500 dark:text-gray-200 sm:hidden">
                {tempShortDescription}
              </p>
            </div>
          </div>
          <hr className="m[1px] mx-2 border-gray-200 dark:border-gray-600" />
        </Link>
        <footer className="flex w-full ">
          <div className="flex w-full flex-row">
            <div className="flex py-1 flex-row ml-2 flex-nowrap justify-end text-xs">
              <Link
                className="flex h-7 self-center mr-3 rounded-md flex-row hover:bg-gray-200 dark:hover:bg-zinc-700 duration-300 ease-in-out transition-all "
                href={`/clanky/${data.slug}#komentare`}
              >
                <FaRegComment className="mx-2 flex h-5 w-5 self-center text-gray-400 dark:text-gray-600" />
                <span className="flex self-center px-1">
                  {data.comments_count}
                </span>
              </Link>
              <Heart
                likes={data.hearts_count}
                heartsList={(data.liked_by ?? []).filter(
                  (
                    item,
                  ): item is {
                    account: string;
                    nickname: string;
                    avatar: string;
                  } => !!item.account && !!item.nickname && !!item.avatar,
                )}
                slug={slug}
              />
            </div>
            <div className="mx-2 flex self-center text-sm">
              <Share share={share} title={data.title} />
            </div>
            <div className="mx-2 self-center">
              <div className="self-center rounded-full bg-gray-200 px-3 py-1 text-xs text-gray-600 dark:bg-gray-600 dark:text-gray-300">
                {data.category}
              </div>
            </div>
          </div>
        </footer>
      </article>
    </div>
  );
};
