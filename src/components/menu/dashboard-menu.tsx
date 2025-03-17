"use client";
import { dashboardMenuData, sessionStateMenu } from "@/src/static-objects/objects/dashboard-menu";
import { useEffect, useState, useRef } from "react";
import {
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useSessionContext } from "@/src/context/session-provider";

export const DashboardMenu = () => {
  const avatarRef = useRef<HTMLElement>(null)
  const [clearance, setClearance] = useState<string>('');
  const [avatar, setAvatar] = useState(
    "https://storage.googleapis.com/khs-zlin/avatars/User-avatar.svg.png",
  )
  const [isClosed, setIsClosed]=useState<boolean>(true)
  const router = useRouter()
  const handleLogout = () => {
    signOut({
      callbackUrl: "/login?filter=logout",
    });
  };

  const session = useSessionContext();
  useEffect(()=>{
      if(session){
        setAvatar(session.user.avatar)
        setClearance(session.user.clearance ?? '')
      }
  },[session])

  const filteredMenu = dashboardMenuData.filter((item)=>item.clearance.includes(clearance))
  const isSession = !clearance ? false : true
  const filteredSessionState = sessionStateMenu.filter((item)=>item.isSession===isSession)

  const handleClick = (action:string)=>{
    setIsClosed(true)
    switch(action){
      case 'logout': handleLogout();break;
      case 'login': router.push('/login');break
      case 'registration': router.push('/registration');break;
      default: break;
    }
  }
    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (
          avatarRef.current &&
          !avatarRef.current.contains(event.target as Node)
        ) {
          setIsClosed(true)
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, []);

  return (
    <Popover 
    ref={avatarRef}
    className="relative flex">
          <PopoverButton className="ml-5 w-16 h-16  flex items-center gap-x-2 rounded-full text-sm leading-6 text-gray-700 focus:outline-none dark:text-gray-300">
            <img
              onClick={()=>setIsClosed(false)}
              src={avatar}
              alt="User Avatar"
              className="img-contain rounded-full"
              width={50}
              height={50}
            />
          </PopoverButton>
          {!isClosed && 
          <PopoverPanel className="border- absolute right-0 top-16 z-10 w-60 rounded-xl  border-[1px] border-gray-200 bg-slate-100 shadow-lg shadow-gray-400/50 drop-shadow-xl dark:border-gray-500 dark:bg-gray-800 dark:shadow-gray-700/50">
          <div className="p-4">
            {filteredMenu.map((item,i)=>{
              return (
                <Link
                key={i}
                onClick={() => close()}
                href={item.link}
                className="text-sm leading-6 text-gray-700 dark:text-gray-300"
              >
                <div className="group relative flex items-center gap-x-6 border-b-[1px] border-b-gray-200 text-sm leading-6 hover:bg-gray-200 dark:border-b-gray-700 dark:hover:bg-gray-700">
                  <div className="flex h-11 w-11 flex-none items-center justify-center bg-slate-100 group-hover:bg-gray-200 dark:bg-gray-800 dark:group-hover:bg-gray-700">
                    <item.icon
                      aria-hidden="true"
                      className="h-6 w-6 text-gray-600 group-hover:text-orange-600 dark:text-gray-400 dark:group-hover:text-white"
                    />
                  </div>
                  <div className="flex-auto group-hover:text-orange-600 dark:group-hover:text-white">
                    {item.label}
                  </div>
                </div>
              </Link>
              )
            })}
            {
              filteredSessionState.map((item,j)=>{
                return (
                  <button
                  aria-label={`${item.action} button handler`}
                  key={j}
                  onClick={() => handleClick(item.action)
                  }
                  className="text-sm w-full text-start leading-6 text-gray-700 dark:text-gray-300"
                >
                  <div className="group relative flex items-center gap-x-6 border-b-[1px] border-b-gray-200 text-sm leading-6 hover:bg-gray-200 dark:border-b-gray-700 dark:hover:bg-gray-700">
                    <div className="flex h-11 w-11 flex-none items-center justify-center bg-slate-100 group-hover:bg-gray-200 dark:bg-gray-800 dark:group-hover:bg-gray-700">
                      <item.icon
                        aria-hidden="true"
                        className="h-6 w-6 text-gray-600 group-hover:text-orange-600 dark:text-gray-400 dark:group-hover:text-white"
                      />
                    </div>
                    <div className="flex-auto group-hover:text-orange-600 dark:group-hover:text-white">
                      {item.label}
                    </div>
                  </div>
                </button>
                )
              })
            }
          </div>
        </PopoverPanel>}
    </Popover>
  );
};
