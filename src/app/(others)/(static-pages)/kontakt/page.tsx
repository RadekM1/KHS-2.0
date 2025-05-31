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
    <section className="w-full flex min-h-screen flex-col text-gray-700 dark:text-white items-center text-center">
      <h1 className="items-center my-16 font-bold text-2xl md:text-4xl">
        KONTAKT
      </h1>
      <article className="prose prose-gray dark:prose-invert w-full px-4 overflow-hidden text-start dark:border-b-gray-700">
        <p className="text-start md:text-center">
          Máš dotaz nebo se chceš připojit? <br />
          <span className="font-semibold text-orange-400 dark:text-orange-300">
            Jsme tu pro tebe a rádi odpovíme na všechny otázky.{" "}
          </span>
          Klub horských sportů Zlín má dveře otevřené pro všechny milovníky hor
          a lezení.
        </p>

        <div className="w-full flex flex-col md:py-10 lg:py-16 p-2 lg:p-6 my-12">
          <div className="flex flex-col md:flex-row items-center gap-5 lg:gap-10 p-2 lg:p-6 w-full text-center md:text-start  md:items-start  justify-start">
            <div className="dark:bg-zinc-800 bg-gray-100 flex-grow rounded-xl px-10 py-5">
              <h2 className="items-start text-start lg:items-center mt-10  font-bold text-2xl md:text-3xl">
                <span className="dark:text-orange-300">ZÁKLADNÍ INFORMACE</span>
              </h2>
              <div className="mt-6 text-start ml-1">
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
                      className="font-semibold text-orange-400 dark:text-orange-300 hover:underline"
                    >
                      Najdete nás zde
                    </a>
                  </p>
                </address>
                <p className="mt-4">
                  IČO: 65823494
                  <br />
                  Číslo účtu: 6683137002/5500
                  <br />
                  Jsme neplátci DPH.
                </p>
              </div>
            </div>

            <div className="dark:bg-zinc-800 h-full bg-gray-100 rounded-xl px-10 py-5">
              <h2 className="items-start text-start lg:items-center mt-10  font-bold text-2xl md:text-3xl">
                <span className="dark:text-orange-300">ODDÍLOVÉ KONTAKTY</span>
              </h2>
              <div className="mt-6 text-start ml-1">
                <p>
                  <a
                    href="mailto:info@khszlin.com"
                    className="font-semibold text-orange-400 dark:text-orange-300 hover:underline"
                  >
                    info@khszlin.com
                  </a>
                </p>
              </div>
              <ul className="list-disc leading-tight mt-6 space-y-5 pb-10 pl-4 md:pl-6 text-start">
                <li>
                  <span className="font-semibold dark:text-orange-300">
                    Předseda
                  </span>
                  {" – Mirek Ingr, 737 741 740"}
                </li>
                <li>
                  <span className="font-semibold dark:text-orange-300">
                    Místopředseda
                  </span>
                  {" – Filip Kotopulos, 606 647 037"}
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-5 lg:gap-10 p-2 mt-1 lg:p-6 w-full text-center md:text-start items-center  md:items-start  justify-start">
            <div className="dark:bg-zinc-800 bg-gray-100 flex-grow rounded-xl px-10 py-5">
              <h2 className="items-start text-start lg:items-center mt-10  font-bold text-2xl md:text-3xl">
                <span className=" dark:text-orange-300">HOROŠKOLA</span>
              </h2>
              <div className="mt-6 text-start ml-1">
                <p>
                  <a
                    href="mailto:horoskola@khszlin.com"
                    className="  hover:underline"
                  >
                    horoskola@khszlin.com
                  </a>
                </p>
              </div>

              <div>
                <h2 className="items-start text-start lg:items-center mt-10  font-bold text-2xl md:text-3xl">
                  <span className=" dark:text-orange-300">CHATA NA LUKOVĚ</span>
                </h2>
                <div className="mt-6 text-start ml-1">
                  <p>
                    Petr Hrnčiřík, 603 192 047
                    <br />
                    <a
                      href="mailto:chata@khszlin.com"
                      className=" hover:underline"
                    >
                      chata@khszlin.com
                    </a>
                  </p>
                </div>
              </div>

              <div>
                <h2 className="items-center mt-10 text-2xl md:text-3xl">
                  <span className="font-semibold dark:text-orange-300">
                    KNIHOVNA PRŮVODCŮ
                  </span>
                </h2>
                <div className="mt-6 text-start ml-1">
                  <p>
                    Mirek Ingr, 737 741 740
                    <br />
                    <a
                      href="mailto:knihovna@khszlin.com"
                      className="  hover:underline"
                    >
                      knihovna@khszlin.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <div className="dark:bg-zinc-800 bg-gray-100 flex-grow rounded-xl px-10 py-5">
              <h2 className="items-start text-start lg:items-center mt-10  font-bold text-2xl md:text-3xl">
                <span className=" dark:text-orange-300">OSTATNÍ KONTAKTY</span>
              </h2>
              <ul className="list-disc leading-tight mt-6 space-y-5 pb-10 pl-8 md:pl-10 text-start">
                <li>
                  <span className="font-semibold dark:text-orange-300">
                    Webmaster
                  </span>
                  {" – "}
                  <a
                    href="mailto:admin@khszlin.com"
                    className="font-normal  hover:underline"
                  >
                    admin@khszlin.com
                  </a>
                </li>
                <li>
                  <span className="font-semibold dark:text-orange-300">
                    Správce stěny
                  </span>
                  {" – Lubomír Polišenský, 603 165 526"}
                </li>
                <li>
                  <span className="font-semibold dark:text-orange-300">
                    Půjčovna vybavení
                  </span>
                  {" – Česlo, 608 614 760"}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}
