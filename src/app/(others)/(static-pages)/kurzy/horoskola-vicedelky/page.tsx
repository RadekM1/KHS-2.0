import { Metadata } from "next";
import { Gallery } from "@/src/components/gallery";
import { moutainCourseGallery } from "@/src/static-objects/objects/static-pages-gallery/mountain-course";
import {
  mountainClimbBulletsOne,
  mountainClimbBulletsTwo,
} from "@/src/static-objects/objects/static-pages-objects/mountain-climb-course";

export const metadata: Metadata = {
  title: "Klub horských sportů Zlín - vícedélkové lezení",
  description:
    "Kurz vícedélkového lezení v horách, jeho charakteristiky a pozvánka do horoškoly",
  icons: {
    icon: "/favicon.ico",
  },
  keywords: [
    "KHS Zlín",
    "vícedélkové lezení",
    "horolezectví",
    "lanové délky",
    "horoškola",
  ],
  authors: [{ name: "Radek Morong", url: "https://www.radekmorong.cz" }],
  alternates: {
    canonical: "https://www.khszlin.com/kurzy/horoskola-vicedelky",
  },
};

export default function page() {
  return (
    <section className="w-full px-2 md:px-6 lg:px-10 flex min-h-screen flex-col text-gray-600 dark:text-white items-center text-center">
      <h1 className="items-center my-16 font-bold text-2xl md:text-4xl">
        VÍCEDÉLKOVÉ LEZENÍ
      </h1>
      <article className="border-t-[1px] pt-16 lg:pt-24 w-full overflow-hidden dark:border-b-gray-700">
        <div className="w-full flex leading-loose flex-col md:flex-row">
          <div className="text-start">
            Tak jo, kamzíku. Základní kurz máš za sebou a chuť lézt dál? Paráda!{" "}
            V tomto navazujícím kurzu tě čekají{" "}
            <span className="font-semibold text-orange-400 dark:text-orange-300">
              výstupy, které nekončí jednou lanovou délkou{" "}
            </span>
            ale vedou až k vrcholům.{" "}
            <p className="mt-10">
              <span className="font-semibold">
                Čeká tě víc délek, víc výšky a víc zážitků.{" "}
              </span>
              Ať už v rakouských Alpách nebo na tatranské žule, podle podmínek a
              počasí.
            </p>
          </div>
          <div className="flex pl-0 mt-10 md:mt-0 justify-center md:pl-6  md:min-w-[300px] md:w-full">
            <img
              className="max-w-[400px] md:w-full self-start flex rounded-xl object-contain "
              src="https://storage.googleapis.com/khs-zlin/static-sites-gallery/vicedelky-kurz/vicedelky.png"
              alt="obrázek lezení skály vícedélky"
            />
          </div>
        </div>
        <h2 className="items-center mt-20 mb-10 lg:mt-32  font-bold text-2xl md:text-3xl">
          Co tě čeká?
        </h2>
        <p className="mt-8 my-6 text-start">
          <span className="font-semibold">
            Čeká tě kombinace praktického lezení a teoretických přednášek.
          </span>{" "}
          Těšit se můžete na:
        </p>
        <ul className="list-disc md:mx-10 leading-tight space-y-5 pl-10 text-start">
          {mountainClimbBulletsOne.map((bullet, i) => (
            <li key={i}>
              <span className="font-semibold">{bullet.bold}</span>
              {bullet.text}
            </li>
          ))}
        </ul>
        <div className="w-full flex flex-col md:py-10 lg:py-16 rounded-xl my-24 dark:bg-zinc-800 bg-gray-100">
          <h2 className="items-center mt-5 pb-10 lg:pb-16 font-bold text-2xl md:text-3xl">
            Praktické informace
          </h2>
          <ul className="list-disc leading-tight md:mx-10 space-y-5 pb-10 pl-10 text-start">
            <li>
              <span className="font-semibold">Pro koho:</span> Absolventy
              základního skalního kurzu
            </li>
            <li>
              <span className="font-semibold">Místo konání:</span> Rakousko Alpy
              nebo Slovensko Tatry
            </li>
            <li>
              <span className="font-semibold">Termín:</span> Standardně v
              průběhu léta
            </li>
          </ul>
        </div>
        <h2 className="mt-24 mb-10 lg:mt-32 font-bold text-2xl md:text-3xl">
          Co je to vícedélkové lezení?
        </h2>
        <p className="my-16  text-start text-base">
          Vícedélkové lezení už je horolezectví v pravém slova smyslu. Výstupy v
          horách bývají dlouhé i několik set metrů a vedou vším možným. Od
          vzdušných hřebenovek až po kolmé a technicky náročné stěny.
        </p>
        <h3 className="mt-14 text-start text-xl md:text-2xl">CO TO OBNÁŠÍ?</h3>
        <ul className="list-disc mt-10 leading-tight md:mx-10 space-y-5 pb-10 pl-10 text-start">
          {mountainClimbBulletsTwo.map((bullet, i) => (
            <li key={i}>
              <span className="font-semibold">{bullet.bold}</span>
              {bullet.text}
            </li>
          ))}
        </ul>
        <p className="my-16  text-start text-base">
          Skalní lezení rozvíjí nejen fyzickou kondici, ale i schopnost
          plánovat, soustředit se a zachovat chladnou hlavu v náročných
          situacích. Je to sport, který kombinuje pohyb, myšlení a důvěru ve
          vlastní schopnosti i ve své lezecké parťáky.
        </p>
        <div className="w-full flex flex-col text-start py-2 md:py-10 rounded-xl my-12 dark:bg-zinc-800 bg-gray-100">
          <div className="w-full md:ml-10 italic text-gray-400 flex flex-col md:border-l-[1px] border-gray-600">
            <span className="md:px-10 px-2">
              Parťák zmizí za hranu. Já jistím. Ticho. Lano se hýbe. Zase ticho.
              Pak z dálky: „Štand! Jistím!” -„Lezu!”
            </span>
            <span className="md:px-10 px-2">
              Délka hotová. Výhled, ticho, radost. A jedeme dál.
            </span>
          </div>
        </div>
        <h2 className="mt-20 lg:mt-28 mb-10 font-bold text-2xl md:text-3xl">
          Fotky z kurzu
        </h2>
        <Gallery gallery={moutainCourseGallery} />
      </article>
    </section>
  );
}
