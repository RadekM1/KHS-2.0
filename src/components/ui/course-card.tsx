import Link from "next/link";
import Image from "next/image";

interface CourseCardProps {
  cards: {
    title: string;
    summary: string;
    link: string;
    thumbnail: string;
  }[];
}

export const CourseCard = ({ cards }: CourseCardProps) => {
  return (
    <div className="flex flex-wrap gap-4 md:gap-10 justify-center  w-full">
      {cards.map((card, i) => {
        return (
          <Link
            key={i}
            className="p-4 group  rounded-xl bg-white dark:bg-zinc-900  hover:bg-gray-300 hover:ease-in-out hover:duration-300  hover:text-white flex flex-col w-[45%] lg:w-[20%] text-center"
            href={card.link}
          >
            <div className="w-full">
              <div className="cursor-pointer  relative  w-full  object-cover">
                <Image
                  className=" object-cover rounded-xl h-[250px] duration-300 ease-in-out group-hover:brightness-50 self-center flex"
                  src={card.thumbnail}
                  alt={card.summary}
                  title={card.summary}
                  width={400}
                  height={400}
                  sizes="(max-width: 640px) 47vw, (max-width: 1024px) 33vw, 200px"
                />
                <span className="absolute top-1/2 -translate-y-1/2 text-sm sm:text-base bg-white/30 rounded-full px-5 py-2 md:text-xl lg:text-2xl text-nowrap left-1/2 z-20 hidden duration-300 group-hover:block ease-in-out text-white -translate-x-1/2">
                  Čti více
                </span>
              </div>
              <div className=" py-4 group-hover:text-orange-400 text-start flex flex-col self-center items-center">
                <p className="font-semibold underline">{card.title}</p>
                <p className="mt-4">{card.summary}</p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
