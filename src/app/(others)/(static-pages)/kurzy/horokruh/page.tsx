import { Metadata } from "next";
import { Gallery } from "@/src/components/gallery";
import { winterCourseGallery } from "@/src/static-objects/objects/static-pages-gallery/winter-course";

export const metadata: Metadata = {
  title: "Klub horských sportů Zlín - zimní lezení",
  description: "Horokruh - lezecký kroužek pro děti",
  icons: {
    icon: "/favicon.ico",
  },
  keywords: [
    "KHS Zlín",
    "lezecký kroužek Zlín",
    "dětský kurz lezení",
    "horoškola",
  ],
  authors: [{ name: "Radek Morong", url: "https://www.radekmorong.cz" }],
  alternates: {
    canonical: "https://www.khszlin.com/kurzy/horokruh",
  },
};

export default function page() {
  return (
    <section className="w-full px-2 md:px-6 lg:px-10 flex min-h-screen flex-col text-gray-600 dark:text-white items-center text-center">
      <h1 className="items-center my-16 font-bold text-2xl md:text-4xl">
        HOROKRUH PRO DĚTI
      </h1>
      <article className="border-t-[1px] pt-16 lg:pt-24 w-full overflow-hidden dark:border-b-gray-700">
        <div className="w-full flex leading-loose flex-col md:flex-row">
          <div className="text-start">
            <p className="mt-10 font-semibold">
              Leze vaše dítě po stromech, zábradlí nebo skříních? Nebo má prostě
              jen přebytek energie, co doma nejde zastavit?
            </p>
            <p className="mt-4">
              Přihlaste ho k nám do lezeckého kroužku{" "}
              <span className="font-semibold text-orange-400 dark:text-orange-300">
                pro děti od 8 do 12 let.
              </span>
            </p>
            <p className="mt-4">
              Tréninky probíhají pravidelně během školního roku,
              <span className="font-semibold">od září do června</span>, na
              oddílové stěně KHS Zlín, kde máme vlastní boulder i venkovní
              lezeckou stěnu. Děti vedou zkušení trenéři s lezeckou praxí a
              hlavně s respektem k dětskému tempu, strachu i nadšení.
            </p>
            <p className="mt-4">
              <span className="font-semibold">Učíme </span>
              správnou techniku, pohyb na stěně, práci s lanem i základy
              bezpečnosti. Všechno formou hry, výzev a radosti z pohybu.
            </p>
            <p className="mt-4">
              Chcete vědět víc nebo přihlásit malého lezce?{" "}
              <span className="font-semibold text-orange-400 dark:text-orange-300">
                Ozvěte se nám, rádi vás přivítáme.
              </span>
            </p>
          </div>
          <div className="flex pl-0 mt-10 md:mt-0 justify-center md:pl-6 md:min-w-[300px] md:w-full">
            <img
              className="w-[300px] md:w-full self-start flex rounded-xl object-contain "
              src="https://storage.googleapis.com/khs-zlin/static-sites-gallery/horokruh/horokruh.png"
              alt="obrázek lezení skály vícedélky"
            />
          </div>
        </div>
        <h2 className="items-center mt-20 mb-10 lg:mt-32  font-bold text-2xl md:text-3xl">
          Fotky z kroužku
        </h2>
        <Gallery gallery={winterCourseGallery} />
      </article>
    </section>
  );
}
