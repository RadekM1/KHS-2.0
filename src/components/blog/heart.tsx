"use client";

import { HearthIcon } from "./hearth-icon";
import { useState, useEffect} from "react";

import { HeartList } from "./heart-list";
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
  const sessionContext = useSessionContext();
  const [clicked, setClicked] = useState(false);
  const [clicks, setClicks] = useState(likes);
  const [justClicked, setJustClicked] = useState<boolean>(false)
  const [heartList, setHeartList] = useState<typeof heartsList>(heartsList)

  const isClicked = heartList.some((account) => account.account === sessionContext?.user.email);

  useEffect(()=>{
    if(isClicked){
      setClicked(true)
    }
  }, [isClicked])
  

  const handleClick = async () => {
    if (sessionContext === null || !slug) {
      console.log("chybí údaje k uložení hodnoty do databáze - id článku, nebo id uživatele");
      return;
    }
    setClicks(clicks + 1);
    setClicked(true);
    const tempUser = {
      account: sessionContext?.user.email,
      nickname: sessionContext?.user.nickName,
      avatar: sessionContext.user.avatar
    }
    const tempHeartsList = [...heartList, tempUser
    ] 
    setHeartList(tempHeartsList)
    handleClickAnimation()
    await heartInsert(slug, sessionContext.user.email)
    
  };

  const handleClickAnimation = () =>{
    setJustClicked(true)
    setTimeout(()=>{
      setJustClicked(false)
    }, 1520)
  }


  return (
    <div className="w-16 flex self-center gap-[2px] ml-3 flex-row flex-nowrap border-l-gray-300 h-7" >
      <button 
      disabled={clicked === true ||  !sessionContext}
      onClick={()=>handleClick()}
      className={`${!sessionContext ? ' cursor-not-allowed' : 'cursor-poiner'} flex self-center h-full`}>
        <HearthIcon className={`
          h-6 w-6  flex self-center
          ${clicked  ? 'text-rose-500' : ' text-transparent' }
          ${!clicked  && sessionContext ? 'hover:animate-pulse hover:text-rose-300 hover:dark:text-rose-300/50' : ''}
          ${justClicked ? 'animate-bounce duration-1000  transition-all' : ''}
          `} />
      </button>
      <HeartList clicks={clicks} heartList={heartList} />
    </div>
  )
};


