import { BsPersonLock } from "react-icons/bs";

export const SensitiveInfoProtect = () => {
  return (
    <div className="flex w-full text-center">
      <section className="mt-10 w-full divide-y divide-slate-200 rounded text-center">
        <details className="group flex w-full flex-grow flex-col items-center justify-center p-4">
          <summary className="flex w-full flex-grow cursor-pointer list-none items-center justify-center gap-4 self-center pr-8 text-center font-medium text-slate-700 transition-colors duration-300 group-hover:text-slate-900 focus-visible:outline-none dark:text-gray-300 [&::-webkit-details-marker]:hidden">
            <BsPersonLock className="h-6 w-6 text-orange-500" />
            Ochrana osobních údajů
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 shrink-0 stroke-slate-700 transition duration-300 group-open:rotate-45"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-labelledby="title-ac06 desc-ac06"
            >
              <title id="title-ac06">Open icon</title>
              <desc id="desc-ac06">
                icon that represents the state of the summary
              </desc>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </summary>
          <div className="flex justify-center">
            <ul className="self-center text-start text-xs text-gray-500 dark:text-gray-300 md:w-1/2">
              <li className="mt-2">
                - citlivé údaje jako email a příjmení nejsou nikde v aplikaci
                veřejně k dispozici
              </li>
              <li className="mt-1">
                - zadané heslo není k dispozici ani adminovi stránek, je uloženo
                v zašifrované podobě a má 60+ znaků
              </li>
              <li className="mt-1">
                - při publikování článků nebo komentářů není zveřejněno vaše
                příjmení, příklad publikované podoby: Jan N. (první písmeno z
                příjmení)
              </li>
              <li className="mt-1">
                - Bylo přistoupeno v rámci účtu místo přezdívky k jménu a
                příjmení z důvodu navázání databáze půjčovny vybavení, knih atd.
                pro přehlednější evidenci.
              </li>
            </ul>
          </div>
        </details>
      </section>
    </div>
  );
};
