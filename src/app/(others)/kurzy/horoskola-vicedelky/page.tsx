import { Metadata } from "next";

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
    <section className="w-full flex min-h-screen flex-col text-gray-800 dark:text-white items-center text-center">
      <h1 className="items-center my-4 pb-6 flex flex-nowrap flex-row text-2xl">
        Vícedélkové lezení
      </h1>
      <article className="prose prose-gray dark:prose-invert w-full px-4 overflow-hidden text-start dark:border-b-gray-700">
        <p>
          U vícedélkového lezení v letních horách již hovoříme o horolezectví.
          Výstupy často bývají několik set metrů dlouhé a zahrnují lezení na
          různé typy horských stěn – od lehkých hřebenovek až po technicky
          náročné, strmé stěny. Vícedélkové lezení je obvykle spojeno s
          vysokohorským prostředím, často v Alpách, Dolomitech, Vysokých Tatrách
          nebo dalších horských oblastech.
        </p>

        <h3 className="mt-6 text-xl font-semibold">
          Základní charakteristiky vícedélkového lezení
        </h3>
        <ul className="list-disc list-inside">
          <li>
            <strong>Lanové délky</strong> – Výstup je rozdělen na několik
            kratších úseků, každý z nich může mít různé délky a obtížnosti.
            Prvolezec leze první a zajišťuje cestu pro jeho spolulezce.
          </li>
          <li>
            <strong>Použití lana a jištění</strong> – Při výstupu se zakládá
            jištění a pro každou délku je potřeba na konci vytvořit bezpečné
            stanoviště (štand).
          </li>
          <li>
            <strong>Techniky lezení</strong> – Vícedélkové lezení vyžaduje
            dobrou orientaci na skále, správné používání jištění a schopnost
            plánovat, jak efektivně překonat různorodé terény – od jednoduchých
            skalních bloků po vertikální stěny nebo mixové úseky ve sněhu či
            ledu.
          </li>
          <li>
            <strong>Týmová práce</strong> – lezení často bývá týmovou aktivitou
            dvojic či trojic. Komunikace mezi lezci je klíčová pro bezpečný a
            efektivní postup.
          </li>
          <li>
            <strong>Vysokohorské prostředí</strong> – lezení v horách bývá
            ovlivněno proměnlivým počasím a výškou, což činí výstup složitější a
            náročnější.
          </li>
        </ul>

        <p>
          Vícedélkové lezení je výzvou nejen po technické, ale i fyzické
          stránce. Je to silný zážitek, který vyžaduje dobrou přípravu a
          bezpečnostní opatření.
        </p>
        <p>
          Pokud máte zájem o lezení v horách, určitě se přihlašte do horoškoly!
        </p>
      </article>
    </section>
  );
}
