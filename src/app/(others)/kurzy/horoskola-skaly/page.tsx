import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Klub horských sportů Zlín - skalní lezení",
  description:
    "Základní informace o skalním lezení, disciplíny a termín skalní blok horoškoly",
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
    canonical: "https://www.khszlin.com/kurzy/horoskola-skaly",
  },
};

export default function page() {
  return (
    <section className="w-full flex min-h-screen flex-col text-gray-800 dark:text-white items-center text-center">
      <h1 className="items-center my-4 pb-6 flex flex-nowrap flex-row text-2xl">
        Skalní lezení
      </h1>
      <article className="prose prose-gray dark:prose-invert w-full px-4 overflow-hidden text-start dark:border-b-gray-700">
        <p>
          Skalní lezení je outdoorový sport, který spočívá v lezení po skalách,
          a to buď s použitím lan a jištění, nebo bez něj (tzv. bouldering).
          Cílem je zdolat skalní stěnu nebo skalní masiv, přičemž se využívá
          různé techniky lezení a fyzických schopností, jako je síla, obratnost
          a technika.
        </p>

        <h3 className="mt-6 text-xl font-semibold">Disciplíny</h3>
        <ul className="list-disc list-inside">
          <li>
            <strong>Tradiční lezení (trad)</strong> – lezec používá vlastní
            jištění (např. vkládání skob a kamenů do skalních trhlin).
          </li>
          <li>
            <strong>Sportovní lezení</strong> – používají se předem upevněné
            jištění, například skoby a expresky.
          </li>
          <li>
            <strong>Bouldering</strong> – lezení bez lana na nižších stěnách,
            kde je lezec jištěn pouze podložím nebo crashpady.
          </li>
        </ul>

        <p>
          Skalní lezení je skvělé pro posílení nejen fyzické zdatnosti, ale také
          pro rozvoj mentální odolnosti a problémového myšlení při plánování
          cest.
        </p>

        <p>
          <strong>Skalní blok horoškoly</strong> probíhá vždy na jaře od dubna
          do června.
        </p>

        <p>
          Pokud máte zájem o bezpečné lezení na skalách, určitě se přihlašte do
          horoškoly!
        </p>
      </article>
    </section>
  );
}
