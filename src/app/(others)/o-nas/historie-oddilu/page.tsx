import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Klub horských sportů Zlín - historie oddílu",
  description: "Časová osa s popisem hlavních událostí",
  icons: {
    icon: "/favicon.ico",
  },
  keywords: ["Klub horských sportů Zlín historie oddílu"],
  authors: [{ name: "Radek Morong", url: "https://www.radekmorong.cz" }],
  alternates: {
    canonical: "https://www.khszlin.com/o-nas/historie-oddilu",
  },
};

export default function page() {
  return (
    <section className="w-full flex min-h-screen flex-col text-gray-800 dark:text-white items-center text-center">
      <h1 className="items-center my-4 pb-6 flex flex-nowrap flex-row text-2xl">
        Historie oddílu
      </h1>
      <article className="prose prose-gray dark:prose-invert w-full px-4 overflow-hidden text-start dark:border-b-gray-700">
        <p>
          Zlínský horolezecký oddíl byl založen v roce 1944 partou nadšenců
          Šrámek – Charvát – Trunda – Dobrovolný.
        </p>

        <p>
          <strong>1947</strong> – 1. čs. přelez hřebene Vysokých Tater
          (Zachoval, Záboj, 5 dní, batohy 17 kg)
          <br />
          vzniká tradice letních i zimních výjezdů
        </p>

        <p>
          <strong>1950</strong> – Hokejka VI+, prvovýstup Z stěna Lomnického
          štítu (Zachoval – Plšek)
          <br />
          Bohužel, V. Zachoval zahynul 20. 4. 1952 pod stejnou stěnou před 1.
          zimním výstupem následkem pádu kamení.
        </p>

        <p>
          <strong>1956</strong> – 1. čs. zimní přechod hřebene Západních Tater –
          Roháčů (7 účastníků ze Zlína, 6 dní, batohy 28 kg)
        </p>

        <h3 className="mt-6 text-xl font-semibold">60. léta</h3>
        <p>Alpy</p>

        <h3 className="mt-6 text-xl font-semibold">70. léta</h3>
        <p>Zbyněk Čepela – prvovýstupy v Tatrách i na skalách</p>
        <ul className="list-disc list-inside">
          <li>
            příliv mladých lezců – Ivan Janas, Oldřich Seifer, Radek Velísek,
            Jiří Houšť
          </li>
          <li>zastoupení v reprezentaci (Velísek – Seifer)</li>
          <li>lezou se všechny obtíže Vysokých Tater vč. řady prvovýstupů</li>
        </ul>

        <h3 className="mt-6 text-xl font-semibold">80. léta</h3>
        <p>pokračování sportovního vzestupu v horách</p>
        <ul className="list-disc list-inside">
          <li>
            předseda Jiří Houšť, systematický trénink, funkce trenéra, zimní
            příprava
          </li>
          <li>
            1988 – stavba oddílové stěny, první svého druhu v Československu
          </li>
        </ul>

        <h3 className="mt-6 text-xl font-semibold">90. léta</h3>
        <p>porevoluční uvolnění</p>
        <ul className="list-disc list-inside">
          <li>
            snížení významu reprezentačních družstev, cestování, objevování
            nových skalních oblastí – Francie, Španělsko, USA (Němec), Adršpach
            (Sedláček, Hujíček a jiní)
          </li>
          <li>oddíl lze charakterizovat jako „volné sdružení lezců“</li>
          <li>
            výsledky také na umělých stěnách (Sedláček), špičkové výsledky v
            závodním lezení a sportovních oblastech (Karel “Black” Černý)
          </li>
        </ul>

        <h3 className="mt-6 text-xl font-semibold">21. století</h3>
        <p>
          expedice Nepál, Karákóram, Kavkaz, Fanské hory, Pamír, Ťan‑šan a Peru
          (Tichavský, Ingr, Hurta, Velísek, Bernát a další)
        </p>

        <p>
          <strong>2011</strong> – otevření stěny Vertikon, lezení na umělé
          stěně, přednášky známých osobností a ♨
        </p>

        <p>
          <strong>2022</strong> – Matěj Bernát zdolal všechny alpské
          čtyřtisícovky jako první Čech v historii
        </p>
      </article>
    </section>
  );
}
