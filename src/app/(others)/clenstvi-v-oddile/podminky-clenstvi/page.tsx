import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Klub horských sportů Zlín - členství ve spolku",
  description: "Podmínky, typy členství, práva a povinnosti členů KHS Zlín",
  icons: {
    icon: "/favicon.ico",
  },
  keywords: [
    "KHS Zlín",
    "členství",
    "podmínky členství",
    "práva členů",
    "povinnosti členů",
  ],
  authors: [{ name: "Radek Morong", url: "https://www.radekmorong.cz" }],
  alternates: {
    canonical: "https://www.khszlin.com/o-nas/podminky-clenstvi",
  },
};

export default function page() {
  return (
    <section className="w-full flex min-h-screen flex-col text-gray-800 dark:text-white items-center text-center">
      <h1 className="items-center my-4 pb-6 flex flex-nowrap flex-row text-2xl">
        Členství ve spolku
      </h1>
      <article className="prose prose-gray dark:prose-invert w-full px-4 overflow-hidden text-start dark:border-b-gray-700">
        <p>
          Členství ve spolku je dobrovolné. Členem KHS Zlín (dále jen „člen“) se
          může stát každá fyzická osoba, bez rozdílu pohlaví, vyznání,
          politického a sociálního zařazení, národnosti, rasy či státní
          příslušnosti. Členství je nepřenosné a nepřechází na právního
          nástupce.
        </p>

        <h3 className="mt-6 text-xl font-semibold">Podmínky členství</h3>
        <ul className="list-disc list-inside">
          <li>absolvování horoškoly KHS Zlín</li>
          <li>nebo absolvování horoškoly pod jiným horolezeckým spolkem</li>
          <li>nebo individuální posouzení výborem spolku</li>
        </ul>
        <p>
          O přijetí rozhoduje výbor spolku na základě písemné přihlášky nebo
          návrhu člena výboru.
        </p>

        <h3 className="mt-6 text-xl font-semibold">Typy členství</h3>
        <ul className="list-disc list-inside">
          <li>děti do 15 let</li>
          <li>jednotlivci od 15 do 65 let</li>
          <li>čestné členství nad 65 let</li>
        </ul>

        <h3 className="mt-6 text-xl font-semibold">Ukončení členství</h3>
        <ul className="list-disc list-inside">
          <li>dobrovolným vystoupením</li>
          <li>úmrtím člena</li>
          <li>vyloučením výborem za porušení stanov</li>
          <li>neuhrazením členského příspěvku do 31. 1. daného roku</li>
          <li>zánikem spolku nebo změnou právní formy</li>
        </ul>

        <h3 className="mt-6 text-xl font-semibold">Práva členů</h3>
        <ul className="list-disc list-inside">
          <li>účastnit se činnosti spolku</li>
          <li>být pravidelně informován o dění</li>
          <li>užívat vyhlášené výhody členství</li>
          <li>podávat návrhy, připomínky a dotazy orgánům spolku</li>
          <li>volit na členské schůzi od 15 let</li>
          <li>být volen do orgánů od 18 let</li>
        </ul>

        <h3 className="mt-6 text-xl font-semibold">Povinnosti členů</h3>
        <ul className="list-disc list-inside">
          <li>dodržovat stanovy KHS Zlín a ČHS</li>
          <li>aktivně se účastnit jednání orgánů spolku</li>
          <li>řádně a svědomitě vykonávat svěřené funkce</li>
          <li>platit členské příspěvky včas</li>
          <li>chránit a zvelebovat majetek klubu</li>
          <li>dodržovat pravidla lezení v ČR i zahraničí</li>
        </ul>
        <p>
          Členové neručí za případné dluhy spolku. Seznam členů vede výbor, je
          neveřejný a aktualizován každoročně k 31. 3.
        </p>
      </article>
    </section>
  );
}
