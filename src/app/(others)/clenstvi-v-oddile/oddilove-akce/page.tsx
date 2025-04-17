import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Klub horských sportů Zlín - oddílové akce",
  description: "Hlavní oddílové akce probíhající v průběhu roku",
  icons: {
    icon: "/favicon.ico",
  },
  keywords: ["Klub horských sportů Zlín oddílové akce"],
  authors: [{ name: "Radek Morong", url: "https://www.radekmorong.cz" }],
  alternates: {
    canonical: "https://www.khszlin.com/clenstvi-v-oddile/oddilove-akce",
  },
};

export default function page() {
  return (
    <section className="w-full flex min-h-screen flex-col text-gray-800 dark:text-white items-center text-center">
      <h1 className="items-center flex my-4 pb-6 flex-nowrap flex-row text-2xl">
        Oddílové akce
      </h1>
      <article className="prose prose-gray dark:prose-invert w-full px-4 overflow-hidden text-start dark:border-b-gray-700">
        <p>
          Pravidelně v rámci KHS organizujeme lezecké oddílovky v zahraničí,
          často i mimo hlavní sezónu.
        </p>
        <ul className="list-disc list-inside">
          <li>
            Skály a vícedélky – kamkoliv za pěkným počasím autem nebo letecky
          </li>
          <li>Hory – výstupy v Alpách, Dolomitech či Vysokých Tatrách</li>
        </ul>

        <h3 className="mt-6 text-xl font-semibold">Vzdělávání</h3>
        <ul className="list-disc list-inside">
          <li>Horoškola – výcvik začínajících lezců na skalách</li>
          <li>Horoškola – vícedélkové lezení v horách</li>
          <li>Lavinová prevence</li>
          <li>Lezení v ledu</li>
          <li>Pohyb v zimních horách</li>
        </ul>

        <h3 className="mt-6 text-xl font-semibold">Tradiční akce</h3>
        <ul className="list-disc list-inside">
          <li>Otevírání skal na jaře</li>
          <li>HAMOT Cup – boulderingový závod</li>
          <li>
            Memoriál Vaška Tichavského a Jardy Vaculíka – půlmaraton, přeběh /
            přejezd hřebene Javorníků v Beskydech
          </li>
          <li>
            Horolezecká liška – tradiční oddílová bojovka s horolezeckou
            tematikou
          </li>
          <li>
            Vánoční setkání horolezců na Lukově – zdobení stromečku a setkání
            místních lezců na Štědrý den
          </li>
        </ul>

        <p>
          Dále organizujeme pro mládež lezecký kroužek <strong>Horokruh</strong>
          .
        </p>
      </article>
    </section>
  );
}
