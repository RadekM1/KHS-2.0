import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Klub horských sportů Zlín - výhody členství",
  description: "Členství v oddíle KHS Zlín přináší řadu výhod pro členy",
  icons: {
    icon: "/favicon.ico",
  },
  keywords: ["KHS Zlín", "členství", "výhody členství"],
  authors: [{ name: "Radek Morong", url: "https://www.radekmorong.cz" }],
  alternates: {
    canonical: "https://www.khszlin.com/o-nas/vyhody-clenstvi",
  },
};

export default function page() {
  return (
    <section className="w-full flex min-h-screen flex-col text-gray-800 dark:text-white items-center text-center">
      <h1 className="items-center my-4 pb-6 flex flex-nowrap flex-row text-2xl">
        Výhody členství
      </h1>
      <article className="prose prose-gray dark:prose-invert w-full px-4 overflow-hidden text-start dark:border-b-gray-700">
        <p>
          Členství v oddíle stojí na dobrovolné bázi a přináší nesporné výhody:
        </p>
        <ul className="list-disc list-inside">
          <li>kámoši a parťáci na hory</li>
          <li>pravidelné lezecké akce v ČR i zahraničí</li>
          <li>oddílové závody</li>
          <li>tréninková stěna</li>
          <li>oddílová chata</li>
          <li>klubovna</li>
          <li>knihovna průvodců a beletrie</li>
          <li>půjčovna zimního vybavení</li>
          <li>slevy u partnerů</li>
          <li>know‑how</li>
        </ul>
        <p className="my-5">
          Roční členský příspěvek slouží primárně k podpoře sportu a místní
          lezecké komunity.
        </p>
      </article>
    </section>
  );
}
