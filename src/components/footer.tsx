"use client";

import React from "react";
import Link from "next/link";
import { menuObject } from "../static-objects/objects/menu";
import { ContactInFooter } from "./contact-in-footer";
import { usePathname, useSearchParams } from "next/navigation";

export const Footer = () => {
  const path = usePathname();
  const searchParams = useSearchParams();
  const currentFilter = searchParams.get("filter");

  const activeFooterHeadline = "dark:text-orange-200 text-orange-600";
  const inActiveFooterHeadline =
    "dark:text-white  dark:hover:text-orange-200 hover:text-orange-600";
  const activeFooter =
    "border-l-[1px] pl-2 pt-1 border-l-orange-200 text-orange-600 dark:text-orange-200 ";
  const inActiveFooter =
    "dark:text-white  border-l-[1px] text-gray-700 pl-2 pt-1 border-l-gray-300 dark:hover:border-l-orange-200 hover:border-l-orange-600 dark:border-l-gray-500 dark:hover:text-orange-200 hover:text-orange-600";

  const firstHalfMenu = menuObject.slice(0, 3);
  const secondHalfMenu = menuObject.slice(3);

  return (
    <div className="flex w-full flex-col items-center border-t-gray-300 bg-gray-100 text-gray-700 dark:border-t-gray-500 dark:bg-[#121212] dark:text-white">
      <div className="my-5 w-full max-w-screen-lg px-4 lg:px-0">
        <div className="grid grid-cols-1 justify-center  gap-4 md:grid-cols-2">
          <div className="m-2">
            <div className="mb-4 py-4  text-2xl">
              <Link href="/kontakt">Kontakt</Link>
              <div className="flex w-2/3 border-b-[1px] mt-4 dark:border-gray-500 border-gray-300" />
            </div>
            <ContactInFooter />
          </div>
          <div className="m-2">
            <h2 className="border-b border-b-gray-300 dark:border-gray-500 py-4 text-2xl">
              Navigace
            </h2>
            <div className="mb-4 py-8 gap-10 flex-row  justify-between flex text-2xl">
              <ul className="text-sm ">
                {firstHalfMenu.map((item, i) => {
                  return (
                    <React.Fragment key={i}>
                      {item.link ? (
                        <Link
                          href={item.link}
                          className={` pt-4 font-semibold  ${path.includes(item.link ?? "") ? activeFooterHeadline : inActiveFooterHeadline} `}
                        >
                          <li>{item.label}</li>
                        </Link>
                      ) : (
                        <p className="pt-4 font-semibold">{item.label}</p>
                      )}
                      {item.submenu &&
                        item.submenu.map((subItem, j) => (
                          <Link key={j} href={subItem.link}>
                            <li
                              className={
                                currentFilter ===
                                (subItem && "filter" in subItem
                                  ? subItem.filter
                                  : "")
                                  ? activeFooter
                                  : inActiveFooter
                              }
                            >
                              {subItem.label}
                            </li>
                          </Link>
                        ))}
                    </React.Fragment>
                  );
                })}
              </ul>
              <ul className="text-sm ">
                {secondHalfMenu.map((item, i) => {
                  return (
                    <React.Fragment key={i}>
                      {item.link ? (
                        <Link
                          href={item.link}
                          className={`font-semibold ${path.includes(item.link ?? "") ? activeFooterHeadline : inActiveFooterHeadline} `}
                        >
                          <li className="pt-4">{item.label}</li>
                        </Link>
                      ) : (
                        <p className={`${i !== 0 && "pt-4"} font-semibold`}>
                          {item.label}
                        </p>
                      )}
                      {item.submenu &&
                        item.submenu.map((subItem, j) => (
                          <Link key={j} href={subItem.link}>
                            <li
                              className={
                                currentFilter ===
                                (subItem && "filter" in subItem
                                  ? subItem.filter
                                  : "")
                                  ? activeFooter
                                  : inActiveFooter
                              }
                            >
                              {subItem.label}
                            </li>
                          </Link>
                        ))}
                    </React.Fragment>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-2 flex col-span-2 w-full justify-end border-t-[1px] border-t-gray-300 bg-slate-100 text-gray-400 hover:text-orange-600 dark:border-t-gray-600 dark:bg-[#121212] dark:hover:text-orange-200">
        <a
          href="https://www.radekmorong.cz"
          target="_blank"
          className="flex items-center py-2"
          rel="noreferrer"
        >
          <span className="mr-10 mb-10 col-span-2 text-sm">
            &copy; 2024 crafted by Radek Morong
          </span>
        </a>
      </div>
    </div>
  );
};
