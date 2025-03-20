import Image from "next/image";
import Link from "next/link";
import { Heart } from "./heart";
import { Share } from "./share";
import { FaRegComment } from "react-icons/fa";
import { ParsedPostCardSchema } from "@/src/schemas/queries/articles";

export const BlogCard = ({ data }: { data: ParsedPostCardSchema }) => {
  const tempShortDescription = `${data.description.slice(0, 100)}...`;
  const share = `/clanky/${data.slug}`;
  const slug = data.slug;

  return (
    <div className="mt-4 flex flex-col md:mt-2">
      <div className="flex flex-row flex-wrap rounded border border-gray-200 bg-white shadow-lg transition-shadow duration-300 hover:shadow-lg dark:hover:shadow-none hover:shadow-gray-400 dark:border-gray-600 dark:bg-zinc-800 dark:hover:shadow-gray-800 md:m-2">
        <Link href={`/clanky/${data.slug}`}>
          <div className="mx-auto flex flex-row space-y-3 p-1 transition-opacity duration-300  md:flex-row md:space-x-5 md:space-y-0">
            <div className="w-1/3 max-w-[200px] self-start bg-white px-3 py-1 pl-2 dark:bg-zinc-800">
              <Image
                src={data.thumbnail}
                alt={data.title}
                className="flex max-h-[100px] w-auto self-start rounded object-cover md:max-h-[150px]"
                width={250}
                height={100}
              />
            </div>
            <div className="flex w-2/3 flex-col justify-start bg-white dark:bg-zinc-800">
              <span className="-mt-2 text-start text-xs font-black text-gray-700 dark:text-gray-300 md:mt-2 md:text-base">
                {data.title}
              </span>
              <div className="flex flex-row flex-nowrap">
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
        <div className="flex w-full overflow-hidden">
          <div className="flex w-full flex-row">
            <div className="flex flex-row flex-nowrap justify-end text-xs">
              <div className="flex justify-center h-full text-gray-600 dark:text-gray-100">
                <FaRegComment className="mx-2 flex h-5 w-5 self-center text-gray-400 dark:text-gray-600" />
              </div>
              <div className="mr-2 flex self-center text-xs dark:text-gray-200">
                {data.comments_count}
              </div>
              <div className="mx-2 dark:text-gray-100">
                <Heart
                  likes={data.hearts_count}
                  heartsList={data.liked_by ?? null}
                  slug={slug}
                />
              </div>
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
        </div>
      </div>
    </div>
  );
};
