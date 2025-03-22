import { Popover,
    PopoverContent,
    PopoverTrigger, } from "../ui/popover";

    interface HeartListProps{
        clicks:number;
        heartList: {
            account: string;
            nickname: string;
            avatar: string;
        }[]
    }

export const HeartList = ({clicks, heartList}:HeartListProps) =>{
    return (
        <Popover
        
        >
        <PopoverTrigger
        className="border-gray-300 hover:border-gray-200 p-2  hover:bg-gray-300 dark:hover:bg-zinc-700 self-center flex hover:ease-in-out hover:transition-all dark:border-gray-800 rounded-full hover:duration-300"
        >
          {clicks}
          </PopoverTrigger>
        <PopoverContent>
              <ul className="flex gap-2 hover:text-gray-500 group  h-full flex-col">
              {heartList.map((heartItem,i)=>{
                return (
                  <li 
                  key={i}
                  className="flex hover:border-gray-300 border-1 justify-between  flex-row flex-nowrap" >
                      <div className="flex gap-3 flex-row">
                      <img src={heartItem.avatar} alt="obrázek uživatele" className="rounded-full h-8 w-8 " />
                      <span className="text-gray-800 dark:text-white flex justify-center items-center text-center  self-center">{heartItem.nickname}</span>
                      </div>
                  </li>
                )
              })}
              </ul>
        </PopoverContent>
      </Popover>
    )
}