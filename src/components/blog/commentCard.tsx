"use client";

import Image from "next/image";

export default function CommentCard({ comment }) {
  return (
    <div className="my-4 flex flex-col">
      <div className="flex flex-row flex-wrap self-start rounded-2xl dark:bg-[#161616] md:m-2">
        <div className="mx-auto flex flex-row space-y-3 p-1 transition-opacity md:flex-row md:space-x-2 md:space-y-0">
          <div className="w-[50px] self-start px-1 py-1 pl-2">
            <div className="flex flex-row overflow-hidden">
              <Image
                width={30}
                height={30}
                alt="obrázek uživatele"
                src={comment.avatar}
                className="inline-block h-10 w-10 self-center rounded-full object-fill ring-2 ring-white dark:ring-[#161616]"
              />
            </div>
          </div>
          <div className="flex min-h-[100px] w-2/3 min-w-[300px] flex-col justify-start rounded-2xl border border-gray-200 bg-white dark:border-gray-600 dark:bg-[#1E1E1E]">
            <div className="flex flex-row justify-between">
              <span className="m-2 text-start text-xs font-black text-gray-700 dark:text-gray-300 md:text-base">
                {comment.nickname}
              </span>
              <span className="m-2 text-xs text-gray-500">
                {comment.created.split("T")[0]}
              </span>
            </div>

            <div className="flex flex-row flex-nowrap">
              <div className="m-2 flex self-center text-start text-xs text-gray-500 dark:text-gray-500 md:text-sm">
                {comment.comment}
              </div>
            </div>
          </div>
        </div>
        <hr className="m[1px] mx-2 border-gray-200 dark:border-gray-600" />

        <div className="flex w-full overflow-hidden" />
      </div>
    </div>
  );
}
