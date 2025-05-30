import { Metadata } from "next";
import { historicalPeriods } from "@/src/static-objects/objects/static-pages-objects/history-periods";

export const metadata: Metadata = {
  title: "Klub horských sportů Zlín - historie oddílu",
  description: "Časová osa s popisem hlavních událostí",
  icons: {
    icon: "/favicon.ico",
  },
  keywords: ["Klub horských sportů Zlín historie oddílu"],
  authors: [{ name: "Radek Morong", url: "https://www.radekmorong.cz" }],
  alternates: {
    canonical: "https://www.khszlin.com/o-nas/historie-oddilu",
  },
};

export default function page() {
  return (
    <section className="w-full px-2 md:px-6 lg:px-10 flex min-h-screen flex-col text-gray-600 dark:text-white items-center text-center">
      <h1 className="items-center my-16 font-bold text-2xl md:text-4xl">
        HISTORIE ODDÍLU
      </h1>
      <article className="border-t-[1px] dark:border-b-gray-700 pt-10 w-full overflow-hidden">
        <p className="text-start md:text-center">
          <span className="font-semibold text-orange-400 dark:text-orange-300">
            Od roku 1944 tvoříme zlínskou horolezeckou historii.
          </span>
          <br />
        </p>
        <p className="mt-4 text-start md:text-center">
          Přes{" "}
          <span className="font-semibold">
            osmdesát let tradice, odvahy a přátelství v horách.
          </span>{" "}
          Od prvních výstupů ve Vysokých Tatrách až po moderní expedice na
          nejvyšší vrcholy světa.
        </p>

        <div className="w-full flex flex-col md:py-10 lg:py-16 p-2 lg:p-6 my-24 space-y-6">
          {historicalPeriods.map((period, i) => (
            <div
              key={i}
              className="flex flex-col p-6 md:p-8 w-full text-start rounded-xl items-start dark:bg-zinc-800 bg-gray-100 justify-start"
            >
              <h2 className="items-center mb-6 w-full text-start md:text-center dark:text-orange-300 font-bold textxl md:text-2xl">
                {period.title}
              </h2>
              <div className="w-full text-start space-y-4">
                {period.events.map((event, index) => (
                  <p key={index}>
                    {event.year && <strong>{event.year}</strong>}
                    {event.year && " – "}
                    {event.description}
                  </p>
                ))}
                {period.bulletPoints && (
                  <ul className="list-disc list-inside space-y-2 ml-2">
                    {period.bulletPoints.map((bullet, index) => (
                      <li key={index}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}
