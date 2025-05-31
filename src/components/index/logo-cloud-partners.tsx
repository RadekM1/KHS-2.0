import Image from "next/image";
import { partners } from "@/src/static-objects/objects/sponsors-and-partners";

export const LogoCloudPartners = () => {
  return (
    <div className=" my-24 flex w-full max-w-screen-xl flex-grow flex-col items-center justify-center px-2 sm:px-6 md:px-8 lg:px-4">
      <div className="md:my-5 max-w-screen-xl flex-grow items-center justify-center text-2xl font-bold dark:text-gray-200 sm:px-6 md:px-8 lg:px-4">
        Jsme členy těchto organizací
      </div>
      <div className="mt-5 grid grid-cols-2 items-center gap-3 md:grid-cols-5">
        {partners.map((partner) => (
          <a href={partner.url} key={partner.id}>
            <div className="flex max-h-[150px] max-w-[145px] justify-center p-2">
              <div>
                <Image
                  width={300}
                  height={300}
                  alt={partner.alt}
                  title={partner.title}
                  src={partner.srcLight}
                  className="block max-h-[150px] max-w-[145] dark:hidden"
                />
                <Image
                  width={300}
                  height={300}
                  alt={partner.alt}
                  title={partner.title}
                  src={partner.srcDark}
                  className="hidden max-h-[180px] dark:block"
                />
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
