"use client";
import { useState } from "react";
import { IoShareSocial } from "react-icons/io5";

interface ShareProps {
  share: string;
  title: string;
}

export const Share = ({ share, title }: ShareProps) => {
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "",
          url: share,
        })
        .catch((error) => console.log("Chyba při sdílení:", error));
    } else if (navigator.clipboard) {
      navigator.clipboard
        .writeText(share)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 3000);
        })
        .catch((error) => console.log("Chyba při kopírování:", error));
    } else {
      console.log("Sdílení ani kopírování není podporováno.");
    }
  };

  return (
    <>
      <button
        aria-label={`${title} article share btn`}
        className="h-full hover:bg-gray-200 dark:hover:bg-zinc-700 duration-300 ease-in-out transition-all  hover:rounded-full"
        onClick={() => handleClick()}
      >
        <IoShareSocial className="w-6 h-6 text-gray-500 dark:text-gray-100 flex self-center" />
      </button>
      {copied && <span>Odkaz zkopírován do schránky</span>}
    </>
  );
};
