"use client";

import Image from "next/image";

export default function CommentCard({ comment }) {
  return (
    <li className="flex text-black dark:text-white flex-col">
      <div className="flex flex-row flex-wrap self-start md:m-2">
        <div className="mx-auto flex flex-row space-y-3 p-1 transition-opacity md:flex-row md:space-x-2 md:space-y-0">
          <div className="w-[50px] self-start px-1 py-1 pl-2">
            <div className="flex flex-row overflow-hidden">
              <Image
                width={30}
                height={30}
                alt="obrázek uživatele"
                src={comment.avatar}
                className="h-10 w-10 self-center rounded-full "
              />
            </div>
          </div>
          <div className="flex min-h-[100px] min-w-[300px] flex-col justify-start rounded-md border border-gray-200 dark:border-gray-600">
            <div className="flex flex-row justify-between">
              <span className="m-2 text-start text-xs font-black  md:text-base">
                {comment.nick_name}
              </span>
              <span className="m-2 text-xs">
                {comment.created.split("T")[0]}
              </span>
            </div>
            <div className="flex flex-row flex-nowrap">
              <div className="m-2 flex self-center text-start text-xs  md:text-sm">
                {comment.comment}
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
