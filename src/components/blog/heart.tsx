"use client";

import { HearthIcon } from "./hearth-icon";
import { useState, useEffect } from "react";

import { useSessionContext } from "@/src/context/session-provider";
import { heartInsert } from "@/src/lib/server-functions/backend/heart-insert";

interface HeartProps {
  likes: number;
  heartsList: {
    account: string;
    nickname: string;
    avatar: string;
  }[];
  slug: string;
}

export const Heart = ({ likes, heartsList, slug }: HeartProps) => {
  const [clicked, setClicked] = useState(false);
  const [clicks, setClicks] = useState(likes);
  const sessionContext = useSessionContext();
  const [justClicked, setJustClicked] = useState<boolean>(false)

  const user = sessionContext?.user.email ?? "";
  const isClicked = heartsList.some((account) => account.account === user);

  useEffect(() => {
    if (isClicked) {
      setClicked(true);
    }
  }, [sessionContext, heartsList]);

  const handleClick = async () => {
    if (sessionContext === null || !slug) {
      console.log("chybí údaje k uložení hodnoty do databáze - id článku, nebo id uživatele");
      return;
    }
    setClicks(clicks + 1);
    setClicked(true);
    handleClickAnimation()
    await heartInsert(slug, sessionContext.user.email)
  };

  const handleClickAnimation = () =>{
    setJustClicked(true)
    setTimeout(()=>{
      setJustClicked(false)
    }, 1200)
  }

  console.log(clicked)

  return (
    <div className="w-16 flex flex-row flex-nowrap border-l-gray-300 h-full" >
      <button 
      disabled={clicked === true || !sessionContext}
      onClick={()=>handleClick()}
      className={`${!sessionContext ? ' cursor-not-allowed' : 'cursor-poiner'} h-full`}>
        <HearthIcon className={`
          h-6 w-6   flex self-center
          ${clicked ? 'text-rose-500' : ' text-transparent' }
          ${justClicked ? 'animate-bounce duration-1000  transition-all' : ''}
          `} />
      </button>
    </div>
  )
};


