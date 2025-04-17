import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Klub horských sportů Zlín - kontakt",
  description: "Kontaktní informace KHS Zlín, z.s.",
  icons: {
    icon: "/favicon.ico",
  },
  keywords: ["KHS Zlín", "kontakt", "IČO", "e-mail", "telefon"],
  authors: [{ name: "Radek Morong", url: "https://www.radekmorong.cz" }],
  alternates: {
    canonical: "https://www.khszlin.com/kontakt",
  },
};

export default function page() {
  return (
    <section className="w-full flex min-h-screen flex-col text-gray-800 dark:text-white items-center text-center">
      <h1 className="items-center my-4 pb-6 flex flex-nowrap flex-row text-2xl">
        Kontakt
      </h1>
      <article className="prose prose-gray dark:prose-invert w-full px-4 overflow-hidden text-start dark:border-b-gray-700">
        <address className="not-italic">
          <p>
            Klub horských sportů Zlín, z.s.
            <br />
            Hradská 854
            <br />
            760 01 Zlín
            <br />
            <a
              href="https://mapy.cz/zakladni?q=zlin&source=muni&id=3045&ds=2&x=17.6674861&y=49.2190471&z=17"
              target="_blank"
              className=" hover:underline"
            >
              Najdete nás zde
            </a>
          </p>
        </address>

        <p>
          IČO: 65823494
          <br />
          Číslo účtu: 6683137002/5500
          <br />
          Jsme neplátci DPH.
        </p>

        <h3 className="mt-6 text-xl font-semibold">Oddílové kontakty</h3>
        <p>
          <a href="mailto:info@khszlin.com" className="  hover:underline">
            info@khszlin.com
          </a>
        </p>
        <ul className="list-disc list-inside">
          <li>
            <strong>Předseda</strong> – Mirek Ingr, 737 741 740
          </li>
          <li>
            <strong>Místopředseda</strong> – Filip Kotopulos, 606 647 037
          </li>
        </ul>

        <h3 className="mt-6 text-xl font-semibold">
          Horoškola a vedoucí horoškoly
        </h3>
        <p>
          <a href="mailto:horoskola@khszlin.com" className="  hover:underline">
            horoskola@khszlin.com
          </a>
        </p>

        <h3 className="mt-6 text-xl font-semibold">
          Rezervace chaty na Lukově
        </h3>
        <p>
          Petr Hrnčiřík, 603 192 047
          <br />
          <a href="mailto:chata@khszlin.com" className="  hover:underline">
            chata@khszlin.com
          </a>
        </p>

        <h3 className="mt-6 text-xl font-semibold">
          Knihovna lezeckých průvodců
        </h3>
        <p>
          Mirek Ingr, 737 741 740
          <br />
          <a href="mailto:knihovna@khszlin.com" className="  hover:underline">
            knihovna@khszlin.com
          </a>
        </p>

        <h3 className="mt-6 text-xl font-semibold">Webmaster</h3>
        <p>
          <a href="mailto:admin@khszlin.com" className="  hover:underline">
            admin@khszlin.com
          </a>
        </p>

        <h3 className="mt-6 text-xl font-semibold">Správce stěny</h3>
        <p>Lubomír Polišenský, 603 165 526</p>

        <h3 className="mt-6 text-xl font-semibold">
          Půjčovna horolezeckého vybavení
        </h3>
        <p>Česlo, 608 614 760</p>
      </article>
    </section>
  );
}
