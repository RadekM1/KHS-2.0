import { Metadata } from "next";
import { CourseCard } from "@/src/components/ui/course-card";
import { courseCards } from "@/src/static-objects/objects/static-pages-gallery/course-summary";

export const metadata: Metadata = {
  title: "Klub horských sportů Zlín - zimní lezení",
  description: "Horoškola - úvodní info ke kurzům",
  icons: {
    icon: "/favicon.ico",
  },
  keywords: [
    "KHS Zlín",
    "skalní lezení",
    "sportovní lezení",
    "bouldering",
    "horoškola",
  ],
  authors: [{ name: "Radek Morong", url: "https://www.radekmorong.cz" }],
  alternates: {
    canonical: "https://www.khszlin.com/kurzy/uvodni-info",
  },
};

export default function page() {
  return (
    <section className="w-full px-2 md:px-6 lg:px-10 flex min-h-screen flex-col text-gray-600 dark:text-white items-center text-center">
      <h1 className="items-center my-16 font-bold text-2xl md:text-4xl">
        HOROŠKOLA
      </h1>
      <article className="border-t-[1px] mt-5 flex flex-col pt-16 lg:pt-24 w-full overflow-hidden dark:border-b-gray-700">
        <p className="italic">
          „Horolezci, horolezkyně, horolezčata... Nelezte na skálu, co je hodně
          špičatá.“
        </p>
        <p className="mt-3">
          Radši pojď lézt s náma.{" "}
          <span className="font-semibold">Pořádně, bezpečně a s rozumem.</span>
        </p>
        <h2 className="mt-10 mb-10 lg:mt-16  text-xl md:text-2xl text-orange-400 font-semibold">
          STAŇ SE LEZCEM NEBO HOROLEZCEM POD VEDENÍM ZKUŠENÝCH INSTRUKTORŮ.
        </h2>
        <div className="w-full flex mt-5 leading-loose flex-col md:flex-row">
          <div className="text-start">
            <p className="mt-4">
              Hory, skála, lano, karabina nebo ruce od „maglajzu“. Dny na
              sluníčku nebo v mrazu. Dobrá parta lidí, svačinka s výhledem,
              kofola či pivko po lezení, anebo táboráček s kytarou a buřtem.
            </p>
            <p className="mt-4">
              <span className="font-semibold text-orange-400">
                Horolezectví není jen sport, ale životní styl,{" "}
              </span>
              který ti dá víc, než si myslíš!
            </p>
            <p className="mt-4">
              <span className="font-semibold">Ale pozor, </span>
              není to jen takový výlet na rozhlednu. Tato aktivita patří mezi
              náročné a extrémní sporty, při kterých může jít i o život. Nestačí
              jen síla a odvaha. Důležité jsou také znalosti a zkušenosti. V
              terénu se totiž můžeš dostat do situací, kdy tyto faktory
              rozhodují o bezpečnosti tebe i ostatních. A právě proto jsme tady!
            </p>
            <p className="mt-4">
              <span className="font-semibold">
                Naše vzdělávací kurzy tě provedou od úplných základů až po
                složitější techniky.{" "}
              </span>
              Naučíš se pohyb ve skalách, práci s lanem, jak zvládnout sluníčko,
              déšť, vítr, sníh, led i vlastní nervy. A hlavně, jak se z každé
              cesty vrátit zpátky dolů v pořádku.
            </p>
          </div>
          <div className="flex pl-0 mt-10 md:mt-0 justify-center md:pl-6 md:min-w-[300px] md:w-full">
            <img
              className="w-[300px] md:w-full self-start flex rounded-xl object-contain "
              src="https://storage.googleapis.com/khs-zlin/static-sites-gallery/kurzy-uvod/kurz-text.png"
              alt="obrázek lezení na stěně"
            />
          </div>
        </div>
        <div className="flex flex-col w-full md:py-10 lg:py-16 rounded-xl my-24 dark:bg-zinc-800 bg-gray-100">
          <h2 className="items-center mb-10 font-bold text-2xl md:text-3xl">
            Jaké kurzy u nás najdeš?
          </h2>
          <CourseCard cards={courseCards} />
        </div>
      </article>
    </section>
  );
}
