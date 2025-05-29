import { Metadata } from "next";
import { Gallery } from "@/src/components/gallery";
import { rockCourseGallery } from "@/src/static-objects/objects/static-pages-gallery/rock-course";

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
    <section className="w-full px-2 md:px-6 lg:px-10 flex min-h-screen flex-col text-gray-600 dark:text-white items-center text-center">
      <h1 className="items-center my-10 font-bold text-2xl md:text-4xl">
        HOROŠKOLA SKÁLY
      </h1>
      <article className="border-t-[1px] pt-6 w-full overflow-hidden dark:border-b-gray-700">
      <p className="items-center my-16 font-bold text-center text-base">
        Láká tě skála víc než Netflix? Tak pojď s náma! <span className="text-orange-400">Pořádně, bezpečně a s rozumem.</span>
      </p>
      <div className="w-full flex leading-loose flex-col md:flex-row">
        <div className="text-start">
          <p>
          <span className="font-semibold">Horoškola – skály </span> 
            je náš <span className="text-orange-400 font-semibold">základní kurz pro všechny</span>, kdo chtějí začít lézt ve skalách a naučit se to pořádně od základu, krok za krokem. 
            Žádné chození kolem plotny (ledaže by byla skalní). 
          <span className="font-semibold"> Tady jdeš rovnou na věc. </span>Dostaneš do ruky lezecké cajky, jako je třeba sedák, lano, karabiny a další vychytávky, co tě udrží na skále, a k tomu důležité vědomosti a sebevědomí, abys mohl(a) bezpečně lézt, jistit a orientovat se ve skalním terénu. 
          <span className="font-semibold"> A to všechno pod vedením zkušených instruktorů.</span>
          </p>
          <p className="mt-8 my-6">
            Tento kurz je zároveň vstupní bránou do celé naší horoškoly i do legendárního oddílu. 
            Navazují na něj dva další kurzy – vícedélkové a zimní lezení. A pokud ti to celé vleze pod kůži, můžeš se přidat do party, která neleze jen po skalách, ale drží při sobě po celý rok.
          </p>
          </div>
        <div className="flex pl-0 justify-center md:pl-4 md:min-w-[300px] md:w-full">
          <img className="w-[300px] md:w-full self-start flex rounded-xl object-contain " src="https://storage.googleapis.com/khs-zlin/static-sites-gallery/skaly-kurz/kurz-skaly-text.png" alt="obrázek lezení skály" />
        </div>
      </div>
        <h2 className="items-center my-16 font-bold text-2xl md:text-3xl">
          Co tě čeká?
        </h2>
         <p className="mt-8 my-6 text-start">
            <span className="font-semibold">Čeká tě kombinace praktického lezení a teoretických přednášek.</span> Těšit se můžete na:
          </p>
            <ul className="list-disc md:mx-10 leading-tight space-y-5 pl-10 text-start">
              <li>
                jak se navázat na lano, jistit parťáka a zvládat základní uzly
              </li>
              <li>
                jak se vyznat v lezecké výbavě
              </li>
              <li>
                jak číst terén, volit techniku a pohybovat se po skále
              </li>
              <li>
                jak rozlišit sportovní a tradiční styl lezení
              </li>
              <li>
                první pomoc v terénu a základy zdravovědy
              </li>
              <li>
                menší nástřel do boulderingu – co to je a proč tě to bude bavit
              </li>
              <li>
                jak nenechat parťáka ve štychu, ani sebe
              </li>
              <li>
                a taky jak udržet klid, když se pod tebou ztratí zem a v hlavě se ozve: „Co tady hergot dělám?!“
              </li>
            </ul>
            <div className="w-full flex flex-col py-10 rounded-xl my-24 dark:bg-zinc-800 bg-gray-100">
              <h2 className="items-center pb-10 font-bold text-2xl md:text-3xl">
                Praktické informace
              </h2>
              <ul className="list-disc leading-tight md:mx-10 space-y-5 pb-10 pl-10 text-start">
                <li>
                  <span className="font-semibold">Termín zahájení:</span> V pátek 4. dubna 2025 v 18:00
                </li>
                <li>
                  <span className="font-semibold">Místo konání:</span> Oddílová stěna a klubovna pod lyžařským svahem ve Zlíně
                </li>
                <li>
                  <span className="font-semibold">Pro koho:</span> Začátečníky i mírně pokročilé, od 16 let
                </li>
                <li>
                  <span className="font-semibold">Přednášky:</span> Každý pátek od 18:00 do 21:00
                </li>
                <li>
                  <span className="font-semibold">Praktické nácviky:</span> Vždy v sobotu, případně víkedovka
                </li>
                <li>
                  <span className="font-semibold">Cena</span> dospělí 6.000 Kč, do 26 let 4.000 Kč
                </li>
              </ul>
              <div className="w-full pl-6 md:pl-16 flex text-start md:justify-between leading-loose font-semibold flex-col md:flex-row">
                <div>
                  <span className="text-orange-400 ">Tak co kamzíku, chceš taky zkusit viset na štandu a nejen na gauči?</span>
                  <br/>
                  Těšíme se na tebe. Hore zdar!
                </div>
                 <div className="mx-16 text-nowrap">
                  <a 
                  className="bg-orange-400 text-white p-3 px-8 rounded-full transition-all duration-500 ease-in-out hover:bg-orange-600"
                  target="blank"
                  href="https://docs.google.com/forms/d/e/1FAIpQLSeFqp3X_hDj2-pc1Au_3CxOxgVXS6jFVH3SNfXtcwrch6sVHA/closedform">CHCI SE PŘIHLÁSIT</a>
                </div>
              </div>
            </div>
            <h2 className="my-20 font-bold text-2xl md:text-3xl">
              Co je to vlastně skalní lezení?
            </h2>
            <p className="my-16  text-start text-base">
              Skalní lezení je outdoorový sport, při kterém lezec zdolává skalní stěny a masivy pomocí vlastní síly, techniky a jištění. 
            </p>
            <h3 className="mt-14 text-start text-xl md:text-2xl">
              Základní lezecké disciplíny
            </h3>
            <ul className="list-disc mt-10 leading-tight md:mx-10 space-y-5 pb-10 pl-10 text-start">
              <li>
                <span className="font-semibold">Tradiční lezení (trad) </span>- jištění si lezec zakládá sám (např. friendy, vklíněnce, skoby)
              </li>
              <li>
                <span className="font-semibold">Sportovní lezení </span>- cesty mají předem připravené jištění (např. borháky, nýty, expresky)
              </li>                
              <li>
                <span className="font-semibold">Bouldering </span>- lezení bez lana, na balvanech, s dopadovými matracemi (bouldermatkami)
              </li>
            </ul>
            <p className="my-16  text-start text-base">
              Skalní lezení rozvíjí nejen fyzickou kondici, ale i schopnost plánovat, soustředit se a zachovat chladnou hlavu v náročných situacích. 
              Je to sport, který kombinuje pohyb, myšlení a důvěru ve vlastní schopnosti i ve své lezecké parťáky.
            </p>
            <div className="w-full flex flex-col text-start py-10 rounded-xl my-12 dark:bg-zinc-800 bg-gray-100">
              <div className="w-full ml-10 italic text-gray-400 flex flex-col border-l-[1px] border-gray-600">
                <span className="px-10">Ruce se trochu klepou, nohy ještě hledají balanc. První expreska cvaknutá, dýcháš. Parťák dole jistí. „Máááš to!“ </span>
                <span className="px-10">Zbytek už leze jen tvá hlava. Je to tady. Tvoje první cesta.</span>
              </div>
            </div>
            <h2 className="mt-20 mb-10 font-bold text-2xl md:text-3xl">
              Fotky z kurzu
            </h2>
              <p className="text-start text-base">
              Mrkni na pár fotek, nasaj atmošku a přidej se k nám. :-)
            </p>
            <Gallery gallery={rockCourseGallery} />
      </article>
    </section>
  );
}
