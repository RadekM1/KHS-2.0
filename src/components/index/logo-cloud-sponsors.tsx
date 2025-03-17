import Image from "next/image";
import { sponsors } from "@/src/static-objects/objects/sponsors-and-partners";

export const LogoCloudSponsors = () => {
  return (
    <div className="mx-auto my-5 flex w-full max-w-screen-xl flex-grow flex-col items-center justify-center px-4 sm:px-6 md:px-8 lg:px-4">
      <div className="mx-auto my-10 max-w-screen-xl flex-grow items-center justify-center px-4 text-2xl font-bold dark:text-gray-200 sm:px-6 md:px-8 lg:px-4">
        Partneři
      </div>
      <div className="mt-5 grid grid-cols-2 items-center gap-6 md:grid-cols-4 md:gap-10">
        {sponsors.map((partner) => (
          <a href={partner.url} key={partner.id}>
            <div className="relative flex max-h-[200px] max-w-[200px] self-center p-2">
              <div>
                <Image
                  width={300}
                  height={300}
                  alt={partner.alt}
                  title={partner.title}
                  src={partner.srcLight}
                  className="block max-h-[180px] self-center dark:hidden"
                />
                <Image
                  width={300}
                  height={300}
                  alt={partner.alt}
                  title={partner.title}
                  src={partner.srcDark}
                  className="hidden max-h-[180px] self-center dark:block"
                />
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
