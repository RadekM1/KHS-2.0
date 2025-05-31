import { Metadata } from "next";
import { Gallery } from "@/src/components/gallery";
import { winterCourseGallery } from "@/src/static-objects/objects/static-pages-gallery/winter-course";
import {
  winterBulletsOne,
  winterBulletsTwo,
  winterBulletsThree,
} from "@/src/static-objects/objects/static-pages-objects/winter-course";

export const metadata: Metadata = {
  title: "Klub horských sportů Zlín - zimní lezení",
  description: "Kurz zimního lezení v horách a jeho charakteristik",
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
    canonical: "https://www.khszlin.com/kurzy/zimni-lezeni",
  },
};

export default function page() {
  return (
    <section className="w-full px-2 md:px-6 lg:px-10 flex min-h-screen flex-col text-gray-600 dark:text-white items-center text-center">
      <h1 className="items-center my-16 font-bold text-2xl md:text-4xl">
        HOROŠKOLA ZIMNÍ LEZENÍ
      </h1>
      <article className="border-t-[1px] pt-16 lg:pt-24 w-full overflow-hidden dark:border-b-gray-700">
        <div className="w-full flex leading-loose flex-col md:flex-row">
          <div className="text-start">
            Tak jo, kamzíku.Víš, jak se jistí u stěny a jak postavit štand.{" "}
            <span className="font-semibold dark:text-orange-300">
              Víš ale, co dělá sníh, když ho napadne moc? A co když se terén
              změní v ledový vodopád? Nebo tě překvapí návěj, vítr a zmrzlý
              svah?{" "}
            </span>
            Zimní hory nejsou jen krásné. Znamenají lavinové svahy, zmrzlé
            skály, led, promrzlé prsty a rozhodnutí, která umí zachránit život.
            <p className="mt-10">
              <span className="font-semibold text-orange-400 dark:text-orange-300">
                Tento kurz tě vezme do zimního terénu,
              </span>{" "}
              kde se naučíš, jak přežít a fungovat bezpečně. Budeš plánovat
              túry, lézt v ledu, kopat cepínem, vyhledávat v lavině a zvládat
              krizovky s chladnou hlavou.
            </p>
          </div>
          <div className="flex mt-5 md:mt-0 pl-0 justify-center md:pl-4 md:min-w-[300px] md:w-full">
            <img
              className="w-[300px] md:w-full self-start flex rounded-xl object-contain "
              src="https://storage.googleapis.com/khs-zlin/static-sites-gallery/zimni-kurz/winter.png"
              alt="obrázek lezení skály vícedélky"
            />
          </div>
        </div>
        <h2 className="items-center mt-20 mb-10 lg:mt-32  font-bold text-2xl md:text-3xl">
          Co tě čeká?
        </h2>
        <p className="mt-8 my-6 text-start">
          <span className="font-semibold dark:text-orange-300">
            Čeká tě kombinace praktického lezení a teoretických přednášek.
          </span>{" "}
          Těšit se můžete na:
        </p>
        <ul className="list-disc md:mx-10 leading-tight space-y-5 pl-10 text-start">
          {winterBulletsOne.map((bullet, i) => (
            <li key={i}>{bullet}</li>
          ))}
        </ul>
        <div className="w-full flex  flex-col md:py-10 lg:py-16 rounded-xl my-24 dark:bg-zinc-800 bg-gray-100">
          <h2 className="items-center mt-5 pb-10 lg:pb-16 font-bold text-2xl md:text-3xl">
            Praktické informace
          </h2>
          <ul className="list-disc leading-tight md:mx-10 space-y-5 pb-10 pl-10 text-start">
            {winterBulletsTwo.map((bullet, i) => (
              <li key={i}>
                <span className="font-semibold dark:text-orange-300">
                  {bullet.bold}
                </span>
                {bullet.text}
              </li>
            ))}
          </ul>
        </div>
        <h2 className="mt-24 mb-10 lg:mt-32 font-bold text-2xl md:text-3xl">
          ZIMA V HORÁCH
        </h2>
        <p className="my-16  text-start text-base">
          V zimních horách nejde jen o výbavu a odvahu. Jde hlavně o znalosti,
          rozhodování a schopnost číst terén.
        </p>
        <h3 className="mt-14 text-start text-xl md:text-2xl">
          Co všechno řešíš v zimních horách?
        </h3>
        <ul className="list-disc mt-10 leading-tight md:mx-10 space-y-5 pb-10 pl-10 text-start">
          {winterBulletsThree.map((bullet, i) => (
            <li key={i}>
              <span className="font-semibold dark:text-orange-300">
                {bullet.bold}
              </span>
              {bullet.text}
            </li>
          ))}
        </ul>
        <p className="mt-16  text-start text-base">
          <span className="font-semibold text-orange-400 dark:text-orange-300">
            Bez výbavy to v zimních horách nejde.{" "}
          </span>
          Ale neexistuje jedna „zimní povinná výbava“.{" "}
          <span className="font-semibold dark:text-orange-300">
            Vždy záleží, co děláš.{" "}
          </span>
          Jinou výbavu si vezmeš do lavinového terénu, jinou na ledolezení a
          jinou na túru na sněžnicích nebo skialpech.
        </p>
        <p className="text-start mt-6">
          <span className="font-semibold dark:text-orange-300">
            Například při zimní vysokohorské túře v lavinovém nebo ledovcovém
            terénu{" "}
          </span>
          se hodí lavinová výbava (pípák, sonda, lopata), dále cepín, mačky,
          sedák, lano, prusíky, smyčky, karabiny, čelovka, náhradní rukavice a
          další.
        </p>
        <p className="text-start mt-6">
          Vybavení je základ. Ale ještě důležitější je umět s ním pracovat,
          kombinovat ho podle terénu a podmínek.
        </p>
        <div className="w-full flex flex-col text-start py-2 md:py-10 rounded-xl my-12 dark:bg-zinc-800 bg-gray-100">
          <div className="w-full md:ml-10 italic text-gray-400 flex flex-col md:border-l-[1px] border-gray-600">
            <span className="md:px-10 px-2">
              Vítr se opírá do svahu. Sníh je tvrdý jak beton. Cepín v ruce,
              lezeš traverz. Nad náma návěj. „Tohle rychle projdem.“
            </span>
            <span className="md:px-10 px-2">
              Ticho. Pak prasknutí. Nic se nestalo, ale mohlo.
            </span>
          </div>
        </div>
        <h2 className="mt-20 lg:mt-28 mb-10 font-bold text-2xl md:text-3xl">
          Fotky z kurzu
        </h2>
        <Gallery gallery={winterCourseGallery} />
      </article>
    </section>
  );
}
