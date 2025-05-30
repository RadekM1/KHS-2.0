import { Metadata } from "next";
import { benefitsBullets } from "@/src/static-objects/objects/static-pages-objects/benefits";

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
    <section className="w-full px-2 md:px-6 lg:px-10 flex min-h-screen flex-col text-gray-600 dark:text-white items-center text-center">
      <h1 className="items-center my-16 font-bold text-2xl md:text-4xl">
        VÝHODY ČLENSTVÍ
      </h1>
      <article className="border-t-[1px] dark:border-b-gray-700 pt-10 w-full overflow-hidden ">
        <p className="text-start md:text-center">
          <span className="font-semibold text-orange-400">
            Protože dobrá parta, lano a společný cíl dělají z lezení něco víc
            než jen sport.
          </span>
          <br />
        </p>
        <p className="mt-4 text-start md:text-center">
          U nás nejde jen o výkon,{" "}
          <span className="font-semibold">
            ale o zážitky, přátelství a dobrodružství, na která se nezapomíná.
          </span>{" "}
          Ať jsi nováček nebo ostřílený kamzík, v oddílu najdeš svoje místo.
          Jsme parta, která táhne za jedno lano.
        </p>
        <div className="w-full  flex flex-col md:py-10 lg:py-16 p-2 lg:p-6 my-24 ">
          <div className="flex flex-col p-2 md:p-6 w-full text-start rounded-xl items-start dark:bg-zinc-800 bg-gray-100 justify-start">
            <h2 className="items-center mt-10 w-full text-center dark:border-white font-bold text-2xl md:text-3xl">
              Co všechno jako člen získáš?
            </h2>
            <ul className="list-disc leading-tight mt-8 md:mx-10 space-y-5 pb-10 pl-4 md:pl-10 text-start">
              {benefitsBullets.map((bullet, i) => {
                return <li key={i}>{bullet}</li>;
              })}
            </ul>
            <p className="py-10">
              Roční příspěvek pomáhá udržet oddíl v chodu a umožňuje nám
              rozvíjet místní lezeckou komunitu.
            </p>
          </div>
        </div>
        <p className="mt-16 font-semibold">
          Tak kamzíku, neváhej a přidej se k nám!
        </p>
        <p className="mt-10 font-semibold text-orange-400 text-xl lg:text-2xl">
          TĚŠÍME SE NA TEBE. HORE ZDAR!
        </p>
      </article>
    </section>
  );
}
