"use client";
import { usePathname } from "next/navigation";
import { IoHomeSharp } from "react-icons/io5";
import Link from "next/link";

export const Breadcrumbs = () => {
  const pathName = usePathname();
  const pathNames = pathName.split("/").filter((path) => path);

  if (pathName === "/") {
    return null;
  }

  return (
    <div className=" mx-auto  flex w-full max-w-screen-xl flex-grow flex-row justify-start overflow-auto border-b-gray-300 px-4 dark:border-b-gray-600 dark:text-gray-500 sm:px-6 md:px-8 lg:px-4">
      <div className="flex items-center">
        <Link href="/">
          {" "}
          <IoHomeSharp className="mr-2 text-gray-500 hover:text-orange-600 dark:hover:text-orange-200" />{" "}
        </Link>

        {pathNames.map((item, index) => {
          const odkaz = `/${pathNames.slice(0, index + 1).join("/")}`;
          const label = item.includes("-") ? item.replaceAll("-", " ") : item;

          return (
            <span key={index}>
              {' / '}
              <Link
                className="text-gray-600 hover:text-orange-600 dark:text-gray-200 dark:hover:text-orange-200"
                href={odkaz}
              >
                {label}
              </Link>
            </span>
          );
        })}
      </div>
    </div>
  );
}
