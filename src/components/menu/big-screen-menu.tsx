"use client";
import React, { useEffect, useRef, useState } from "react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import Link from "next/link";
import { menuObject } from "@/src/static-objects/objects/menu";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

interface BigScreenMenuProps {
  path: string;
  filter: string;
}

export const BigScreenMenu = ({ path, filter }: BigScreenMenuProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [whichIsOpen, setWhichIsOpen] = useState<number>(10);

  const popoverWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popoverWrapperRef.current &&
        !popoverWrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="hidden  lg:flex self-end items-center justify-center w-full lg:gap-x-7">
      {menuObject.map((item, i) => {
        return (
          <div
            className="h-full max-w-min flex"
            ref={popoverWrapperRef}
            key={i}
          >
            {!item.submenu ? (
              <Link
                href={item.link}
                className={`link text-sm leading-6 ${
                  item.link && path === item.link
                    ? "text-orange-600 dark:text-orange-300 border-b-orange-600 dark:border-b-orange-200 border-b-2"
                    : "text-gray-700 dark:text-white dark:hover:text-orange-200  border-b-2  hover:text-orange-600"
                } z-50 hover:border-b-2 flex-nowrap border-b-2 border-transparent pb-5 hover:border-b-orange-600 dark:hover:border-b-orange-200`}
              >
                {item.label}
              </Link>
            ) : (
              <Popover
                className={`z-50  hover:border-b-2 ${
                  path === "/clanky"
                    ? "text-orange-600 dark:text-orange-300 border-b-orange-600 dark:border-b-orange-200 border-b-2"
                    : "text-gray-700 dark:text-white dark:hover:text-orange-200  border-b-2  hover:text-orange-600"
                } hover:border-b-orange-600 flex-nowrap pb-5 dark:hover:border-b-orange-200`}
              >
                <PopoverButton
                  onClick={() => {
                    setIsOpen(true), setWhichIsOpen(i);
                  }}
                  className="flex flex-nowrap text-nowrap items-center gap-x-1 text-sm leading-6 focus:outline-none"
                >
                  {item.label}
                  <ChevronDownIcon
                    aria-hidden="true"
                    className={`h-5 w-5 flex-non ${isOpen && whichIsOpen === i ? "rotate-180" : "rotate-0"} text-gray-400 duration-300 ease-in-out transition-transform 
                          
                                `}
                  />
                </PopoverButton>
                {isOpen && whichIsOpen === i && (
                  <PopoverPanel className="absolute top-full z-10 w-full max-w-lg rounded-3xl bg-slate-100 shadow-lg drop-shadow-xl dark:bg-gray-800 dark:text-gray-300">
                    <div className="p-4">
                      {item.submenu.map((subitem, j) => (
                        <Link
                          href={subitem.link}
                          key={j}
                          onClick={() => close()}
                          className="ml-5 block font-semibold text-gray-700 dark:text-gray-300"
                        >
                          <div className="group flex items-center gap-x-6 rounded-lg p-2 text-sm leading-6 hover:bg-white dark:hover:bg-gray-700">
                            <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-slate-100 group-hover:bg-white dark:bg-gray-800 dark:group-hover:bg-gray-700">
                              <subitem.icon
                                path={path}
                                aria-hidden="true"
                                className={`${
                                  subitem &&
                                  "filter" in subitem &&
                                  subitem.filter === filter
                                    ? "text-orange-600 dark:text-orange-200"
                                    : "text-gray-600 group-hover:text-orange-600 dark:text-gray-300 dark:group-hover:text-orange-200"
                                } h-6 w-6`}
                              />
                            </div>
                            <div
                              className={`${
                                subitem &&
                                "filter" in subitem &&
                                subitem.filter === filter
                                  ? "text-orange-600 dark:text-orange-200"
                                  : ""
                              } hover:text-orange-600 dark:hover:text-orange-200 flex-auto`}
                            >
                              {subitem.label}
                              <p className="mt-1 font-thin text-gray-600 dark:text-gray-300">
                                {subitem &&
                                  "description" in subitem &&
                                  subitem.description}
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </PopoverPanel>
                )}
              </Popover>
            )}
          </div>
        );
      })}
    </div>
  );
};
