import { Metadata } from "next";
import { Gallery } from "@/src/components/gallery";
import { moutainCourseGallery } from "@/src/static-objects/objects/static-pages-gallery/mountain-course";

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
            Tak jo, kamzíku. Víš, jak se jistí u stěny a jak postavit štand.{" "}
            <span className="font-semibold">
              Víš ale, co dělá sníh, když ho napadne moc? A co když se terén
              změní v ledový vodopád? Nebo tě překvapí návěj, vítr a zmrzlý
              svah?
            </span>
            Zimní hory nejsou jen krásné. Znamenají lavinové svahy, zmrzlé
            skály, led, promrzlé prsty a rozhodnutí, která umí zachránit život.
            <p className="mt-10">
              <span className="font-semibold text-orange-400">
                Tento kurz tě vezme do zimního terénu,
              </span>{" "}
              kde se naučíš, jak přežít a fungovat bezpečně. Budeš plánovat
              túry, lézt v ledu, kopat cepínem, vyhledávat v lavině a zvládat
              krizovky s chladnou hlavou.
            </p>
            <p className="mt-10">...když visíš pár set metrů nad zemí.</p>
          </div>
          <div className="flex pl-0 mt-10 md:mt-0 justify-center md:pl-6 md:min-w-[300px] md:w-full">
            <img
              className="w-[300px] md:w-full self-start flex rounded-xl object-contain "
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
          <li>
            <span className="font-semibold">Meteorologii – </span>
            slunce, vítr, déšť… všechno můžeš potkat v jeden den
          </li>
          <li>
            <span className="font-semibold">Topologii a orientaci – </span>
            protože ani GPS ti nepomůže, když nevíš, kde jsi
          </li>
          <li>
            <span className="font-semibold">Vybavení do hor – </span>
            co máš, co nepotřebuješ a co tě jednou zachrání
          </li>
          <li>
            <span className="font-semibold">
              Taktiku a plánování výstupů –{" "}
            </span>
            aby ses dostal tam i zpět
          </li>
          <li>
            <span className="font-semibold">Nebezpečí v horách – </span>
            laviny, volné kameny, změny počasí… znáš to
          </li>
          <li>
            <span className="font-semibold">Vlastní jištění – </span>
            friendy, vklíněnce, smyčky…
          </li>
          <li>
            <span className="font-semibold">
              Budování štandů ve vícedélkách
            </span>
          </li>
          <li>
            <span className="font-semibold">
              Komunikaci ve stěně, tahání druholezce, slaňování, improvizace
            </span>
          </li>
          <li>
            <span className="font-semibold">
              Záchranné a vyprošťovací techniky
            </span>
          </li>
          <li>
            <span className="font-semibold">Bivakování – </span>
            když cesta trvá déle, než bys chtěl
          </li>
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
              <span className="font-semibold">Místo konání:</span> Rakousko alpy
              nebo Slovensko tatry
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
          <li>
            <span className="font-semibold">Lezeš po délkách – </span>
            Celý výstup je rozdělený na kratší úseky, tzv. lanové délky. Každou
            vede prvolezec, který zakládá jištění a nahoře staví štand pro svého
            parťáka.
          </li>
          <li>
            <span className="font-semibold">Štandy a práce s lanem –</span>{" "}
            cesty mají předem připravené jištění (např. borháky, nýty, expresky)
          </li>
          <li>
            <span className="font-semibold">Techniky lezení –</span> lezení bez
            lana, na balvanech, s dopadovými matracemi (bouldermatkami)
          </li>
          <li>
            <span className="font-semibold">Týmová práce a komunikace – </span>
            Bez dobré komunikace nelze bezpečně postupovat. Vícedélky jsou
            lezení ve dvojici nebo trojici, kde každý krok závisí na spolupráci.
          </li>
          <li>
            <span className="font-semibold">Horské prostředí – </span>
            Počasí se mění rychle, výška ztěžuje pohyb a psychika hraje velkou
            roli. Lezení v horách není jen o síle, ale i o hlavě.
          </li>
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
