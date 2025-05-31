"use client";
import { usePathname } from "next/navigation";
import { IoHomeSharp } from "react-icons/io5";
import Link from "next/link";
import { breadcrumbsLabel } from "@/src/static-objects/objects/breadcrumbs-label";

export const Breadcrumbs = () => {
  const pathName = usePathname();
  const pathNames = pathName.split("/").filter((path) => path);

  return (
    <div className=" mx-auto mt-2 flex w-full max-w-screen-xl flex-grow flex-row justify-start  border-b-gray-300 px-2 dark:border-b-gray-600 dark:text-gray-500 sm:px-6 md:px-8 lg:px-4">
      <div className="flex ">
        <Link className="flex items-baseline" href="/">
          <IoHomeSharp className="mr-1 h-5 w-5 md:h-5 md:w-5 flex sm:mr-2 text-gray-500 hover:text-orange-600 dark:hover:text-orange-200" />
        </Link>

        {pathNames.map((item, i) => {
          const odkaz = `/${pathNames.slice(0, i + 1).join("/")}`;

          const testedLabel = breadcrumbsLabel.find(
            (breadcrumb) => item === breadcrumb.breadcrumb,
          );

          const preparedLabel = testedLabel ? testedLabel.label : item;

          return (
            <span className="flex items-baseline" key={i}>
              <span className="text-gray-500 text-xs sm:text-sm md:text-base text-start leading-none align-top">
                {"/"}
              </span>
              <Link
                className="text-gray-600 text-sm md:text-base text-start hover:text-orange-600 dark:text-gray-200 dark:hover:text-orange-200"
                href={odkaz}
              >
                &nbsp;{preparedLabel}&nbsp;
              </Link>
            </span>
          );
        })}
      </div>
    </div>
  );
};
