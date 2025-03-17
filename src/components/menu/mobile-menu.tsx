"use client";
import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { menuObject } from "@/src/static-objects/objects/menu";

interface MobileMenuProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (mobileMenuOpen: boolean) => void;
  path: string;
  filter?: string;
}

export const MobileMenu = ({
  mobileMenuOpen,
  setMobileMenuOpen,
  path,
  filter,
}: MobileMenuProps) => {
  const activeMobile =
    "dark:border-orange-200 border-orange-600 text-orange-600 dark:text-orange-200 border-l ";
  const inActiveMobile =
    "dark:hover:border-orange-200 hover:bg-gray-50 dark:hover:bg-slate-800 dark:border-gray-500  border-l border-gray-200 hover:border-orange-600  dark:hover:text-orange-200 hover:text-orange-600";

  return (
    <Dialog
      open={mobileMenuOpen}
      onClose={setMobileMenuOpen}
      className="lg:hidden"
    >
      <div className="fixed inset-0 z-50 bg-slate-100/30 backdrop-blur-sm" />
      <DialogPanel className="fixed inset-y-0 left-0 z-50 w-4/6 overflow-y-auto bg-slate-100 px-3 py-3 dark:bg-slate-800 dark:hover:bg-slate-800 sm:w-6/12 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="rounded-lg text-gray-700"
          >
            <XMarkIcon
              aria-hidden="true"
              className="h-10 w-10 dark:text-white"
            />
          </button>
        </div>
        <div className="mt-6 flow-root">
          <div className="-my-6 divide-y divide-gray-500/10">
            <div className="space-y-2 py-5">

              {menuObject.map((item,i)=>{
                return (
                  <React.Fragment
                  key={i}
                  >
                    {!item.submenu ?
                    <Link
                    href={item.link}
                    onClick={() => setMobileMenuOpen(false)}
                    className="-mx-3 block border-b border-gray-200 py-1 leading-7 text-gray-700 hover:bg-gray-50 hover:bg-none dark:border-gray-500 dark:hover:bg-slate-800"
                  >
                    <div className="flex w-5/6 justify-start">
                      <div className="flex w-1/6 justify-center pl-5 align-bottom">
                        <item.mobileIcon className="flex h-6 w-6 self-center dark:text-gray-400" />
                      </div>
                      <div
                        className={` ${path.includes("/novinky") ? "text-orange-600 dark:text-orange-300" : "text-gray-700 dark:text-white"} flex w-5/6 justify-start pl-2 align-middle`}
                      >
                        {item.label}
                      </div>
                    </div>
                  </Link>

                  :

                  <Disclosure
                    as="div"
                    className="-mx-3 border-b border-gray-200 dark:border-gray-500"
                  >
                    <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base leading-7 text-gray-700 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-slate-800">
                      <div className="flex w-5/6 justify-start align-middle">
                        <div className="flex w-1/6 justify-center align-middle">
                          <item.mobileIcon className="flex h-6 w-6 justify-center align-middle" />
                        </div>
                        <div
                          className={` ${path.includes("/clanky") ? "text-orange-600 dark:text-orange-300" : "text-gray-700 dark:text-white"} flex w-5/6 justify-start align-middle`}
                        >
                          <a href="#" className="align-middle">
                            {item.label}
                          </a>
                        </div>
                      </div>
                      <ChevronDownIcon
                        aria-hidden="true"
                        className="h-5 w-5 flex-none group-data-[open]:rotate-180 dark:text-gray-400"
                      />
                    </DisclosureButton>

                    <DisclosurePanel className="mt-2">
                      {item.submenu.map((item,j) => (
                        <DisclosureButton
                          key={j}
                          className="block w-full rounded-lg pl-6 pr-3 text-start text-sm leading-7"
                        >
                          <Link
                            href={item.link}
                            onClick={() => setMobileMenuOpen(false)}
                            passHref
                          >
                            <div
                              className={`flex flex-grow p-2 ${('filter' in item && item.filter === filter) ? activeMobile : inActiveMobile} `}
                            >
                              <div className="ml-2 w-full text-start">
                                {item.label}
                              </div>
                            </div>
                          </Link>
                        </DisclosureButton>
                      ))}
                    </DisclosurePanel>
                  </Disclosure>                
                }
                </React.Fragment>
                )
              })}
            </div>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  );
};
