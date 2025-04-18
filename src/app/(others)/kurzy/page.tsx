import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Klub horských sportů Zlín – výukové bloky a instruktáž",
  description:
    "Staň se lezcem nebo horolezcem pod vedením zkušených instruktorů. Bezpečně objevuj skály a hory s rozumem a pohodou.",
  icons: {
    icon: "/favicon.ico",
  },
  keywords: [
    "horolezectví",
    "školení lezení",
    "instruktoři",
    "Klub horských sportů Zlín",
  ],
  authors: [{ name: "Radek Morong", url: "https://www.radekmorong.cz" }],
  alternates: {
    canonical: "https://www.khszlin.com/o-nas/vzdelavaci-bloky",
  },
};

export default function Page() {
  return (
    <section className="w-full flex min-h-screen flex-col text-gray-800 dark:text-white items-start text-start px-4 py-8">
      <h1 className="items-center my-4 pb-6 flex flex-nowrap flex-row text-2xl">
        Kurzy - úvod
      </h1>
      <article className="prose prose-gray dark:prose-invert max-w-3xl text-start">
        <p>
          Horolezci, horolezkyně, horolezčata... Nelezte na skálu, co je hodně
          špičatá.
        </p>
        <p>
          Radši pojďte lézt s náma – pořádně, bezpečně a s rozumem. Staň se
          lezcem nebo horolezcem pod vedením zkušených instruktorů.
        </p>
        <p>
          Hory, skála, lano, karabina nebo ruce od „maglajzu“. Dny na sluníčku
          nebo v mrazu. Dobrá parta lidí, svačinka s výhledem, kofola či pivko
          po lezení, anebo táboráček s kytarou a buřtem. Horolezectví není jen
          sport, ale životní styl, který ti dá víc, než si myslíš.
        </p>
        <p>
          Ale pozor, není to jen takový výlet na rozhlednu. Tato aktivita patří
          mezi náročné a extrémní sporty, při kterých může jít i o život.
          Nestačí jen síla a odvaha. Důležité jsou také znalosti a zkušenosti. V
          terénu se totiž můžete dostat do situací, kdy tyto faktory rozhodují o
          bezpečnosti vás i ostatních.
        </p>
        <p>
          A právě proto jsme tady! Naše vzdělávací bloky tě provedou vším, co
          potřebuješ znát – od úplných základů až po složitější techniky. Naučíš
          se pohyb ve skalách, práci s lanem, jak zvládnout déšť, vítr, sníh i
          vlastní nervy. A hlavně, jak se z každé cesty vrátit zpátky dolů v
          pořádku.
        </p>
        <p>Tak co, chceš taky zkusit viset na štandu, a nejen na gauči?</p>
        <p>
          Podrobnosti jednotlivých částí vzdělávacích bloků najdeš v menu.
          Těšíme se na tebe – hore zdar!
        </p>
      </article>
    </section>
  );
}
