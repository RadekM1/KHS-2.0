"use client";

import Image from "next/image";
import { IoMdSend } from "react-icons/io";
import { SpinnerSmallOrange } from "../spinners/spinnerSmallOrange";
import { useState, useEffect } from "react";
import { useSessionContext } from "@/src/context/session-provider";

export const CommentCardInput = ({
  setAreaValue,
  areaValue,
  disabled,
  setUser,
  handleClick,
  loading,
  setDisabled,
}) => {
  const [avatar, setAvatar] = useState(
    "https://storage.googleapis.com/khs-zlin/avatars/User-avatar.svg.png",
  );

  const session = useSessionContext();

  useEffect(() => {
    if (session) {
      setDisabled(false);
      setUser(session.user.email);
      setAvatar(session.user.avatar);
    }
  }, [session]);

  return (
    <div className="my-4 w-full items-start flex text-black dark:text-white flex-col">
      <div className="flex flex-row flex-wrap justify-start  self-start rounded-2xl md:m-2">
        <div className="mx-auto flex flex-row space-y-3 p-1 transition-opacity md:flex-row md:space-x-2 md:space-y-0">
          <div className="w-[50px] self-start px-1 py-1 pl-2">
            <div className="flex flex-row overflow-hidden">
              <Image
                width={30}
                height={30}
                alt="obrázek uživatele"
                src={avatar}
                className="inline-block h-10 w-10 self-center rounded-full object-fill ring-2 ring-white dark:ring-[#161616]"
              />
            </div>
          </div>
          <div className="relative flex min-w-[250px] flex-row flex-nowrap justify-start">
            <div className="flex items-start justify-start self-start">
              <textarea
                disabled={disabled || !session}
                id="id-01"
                value={areaValue}
                onChange={(e) => setAreaValue(e.target.value)}
                name="id-01"
                placeholder="Přidat komentář"
                rows={6}
                className="peer relative w-[250px] rounded border  border-slate-200 px-4 py-2 text-sm  placeholder-transparent outline-none transition-all  invalid:border-pink-500 invalid:text-pink-500 focus:border-orange-500 focus:outline-none focus-visible:outline-none disabled:cursor-not-allowed   md:w-[350px] lg:w-[450px]"
              />
              <label
                htmlFor="id-01"
                className="absolute -top-2 left-2 z-[1] cursor-text px-2 text-xs dark:bg-black  transition-all before:absolute before:left-0 before:top-0 before:z-[-1] before:block before:h-full before:w-full f before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm  peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-orange-500  before:bg-white  dark:before:bg-zinc-900"
              >
                Přidat komentář
              </label>
            </div>
            <div className="absolute end-0 right-0 m-2 self-end text-end">
              <button onClick={() => handleClick()} disabled={disabled}>
                {!loading ? (
                  <IoMdSend className="h-6 w-6 text-gray-400 hover:text-orange-400 " />
                ) : (
                  <SpinnerSmallOrange />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div />

      <div className="flex w-full overflow-hidden" />
    </div>
  );
};
