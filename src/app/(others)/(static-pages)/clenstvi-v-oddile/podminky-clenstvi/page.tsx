import { Metadata } from "next";
import { membershipRules } from "@/src/static-objects/objects/static-pages-objects/rules";

export const metadata: Metadata = {
  title: "Klub horských sportů Zlín - podmínky členství",
  description: "Práva a povinnosti členů horolezeckého oddílu",
  icons: {
    icon: "/favicon.ico",
  },
  keywords: ["KHS Zlín", "stanovy", "pravidla členství", "podmínky členství"],
  authors: [{ name: "Radek Morong", url: "https://www.radekmorong.cz" }],
  alternates: {
    canonical: "https://www.khszlin.com/o-nas/podminky-clenstvi",
  },
};

export default function page() {
  return (
    <section className="w-full px-2 md:px-6 lg:px-10 flex min-h-screen flex-col text-gray-600 dark:text-white items-center text-center">
      <h1 className="items-center my-16 font-bold text-2xl md:text-4xl">
        PODMÍNKY ČLENSTVÍ
      </h1>
      <article className="border-t-[1px] dark:border-b-gray-700 pt-10 w-full overflow-hidden ">
        <p className="text-center">
          Ať to zní jakkoliv formálně, členství v oddíle má svá pravidla.{"  "}
          <span className="font-semibold text-orange-400">
            Aby to šlapalo jak ve stěně, tak mezi lidmi.
          </span>
          <br />
        </p>
        <p className="mt-4 text-center">
          Níž najdeš přehled základních podmínek, práv a povinností každého
          člena KHS Zlín. Žádný paragrafový horor, ale fér systém.
        </p>
        <div className="w-full  flex flex-col md:py-10 lg:py-16 p-2 lg:p-6 my-24 ">
          <div className="flex pb-10 flex-col p-6 w-full text-start rounded-xl items-start dark:bg-zinc-800 bg-gray-100 justify-start">
            {membershipRules.map((rule, i) => (
              <section key={i} className="mt-10">
                <span className="font-semibold">{rule.ruleName}</span>
                {rule.ruleText && rule.ruleText}
                {rule.ruleList && (
                  <ul className="list-[lower-alpha] leading-tight mt-3 md:mx-10 space-y-2 pl-4 text-start">
                    {rule.ruleList.map((bullet, i) => (
                      <li key={i}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </div>
      </article>
    </section>
  );
}
