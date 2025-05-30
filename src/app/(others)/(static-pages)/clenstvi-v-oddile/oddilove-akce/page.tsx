import { Metadata } from "next";
import { clubEvents } from "@/src/static-objects/objects/static-pages-objects/events";

export const metadata: Metadata = {
  title: "Klub horských sportů Zlín - oddílové akce",
  description: "Hlavní oddílové akce probíhající v průběhu roku",
  icons: {
    icon: "/favicon.ico",
  },
  keywords: ["Klub horských sportů Zlín oddílové akce"],
  authors: [{ name: "Radek Morong", url: "https://www.radekmorong.cz" }],
  alternates: {
    canonical: "https://www.khszlin.com/clenstvi-v-oddile/oddilove-akce",
  },
};

export default function page() {
  return (
    <section className="w-full flex min-h-screen flex-col text-gray-700 dark:text-white items-center text-center">
      <h1 className="items-center my-16 font-bold text-2xl md:text-4xl">
        ODDÍLOVÉ AKCE
      </h1>
      <article className="prose prose-gray dark:prose-invert w-full px-4 overflow-hidden text-start dark:border-b-gray-700">
        <p className="text-center">
          Horolezci, horolezkyně a horolezčata!{" "}
          <span className="font-semibold text-orange-400">
            V KHS Zlín nelezeš jen po skále, ale patříš do party, co drží při
            sobě.{" "}
          </span>
          Náš oddíl je aktivní po celý rok. <br />
        </p>
        <p className="mt-4 text-center">
          <span className="font-semibold">
            Lezeme, vzděláváme se, závodíme a slavíme.{" "}
          </span>
          Ať je teplo nebo mráz, pořád se něco děje.
        </p>
        <div className="w-full  flex flex-col md:py-10 lg:py-16 p-2 lg:p-6 my-24 ">
          <div className="flex flex-col p-6 w-full text-start rounded-xl items-start dark:bg-zinc-800 bg-gray-100 justify-start">
            {clubEvents.map((clubEvent, i) => {
              return (
                <div key={i}>
                  <h2 className="items-center mt-10 border-l-[3px] border-gray-600 dark:border-white font-bold text-2xl md:text-3xl">
                    <span className="ml-2">{clubEvent.heading}</span>
                  </h2>
                  <p className="mt-6 ml-1">{clubEvent.summary}</p>
                  <ul className="list-disc leading-tight mt-6 md:mx-10 space-y-5 pb-10 pl-10 text-start">
                    {clubEvent.bullets.map((bullet, i) => {
                      return (
                        <li key={i}>
                          <span className="font-semibold">{bullet.bold}</span>
                          {bullet.text}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </article>
    </section>
  );
}
