"use client";

import { useState } from "react";

import { Bars3Icon } from "@heroicons/react/24/outline";
import { ThemeToggle } from "../btns/day-night-toggle";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MobileMenu } from "./mobile-menu";
import { BigScreenMenu } from "./big-screen-menu";
import { DashboardMenu } from "./dashboard-menu";

export const Menu = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathName = usePathname();

  return (
    <>
      <header className="fixed top-0 z-30 w-full border-b border-b-gray-300 justify-center items-center flex bg-stone-100/90 backdrop-blur-sm dark:border-b-gray-600 dark:bg-[#1E1E1E]/80">
        <nav
          aria-label="Global"
          className="flex  max-w-7xl w-full self-center flex-row flex-nowrap items-end justify-between "
        >
          <div className="flex h-full self-center">
            <div className="flex  h-full lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="flex h-full self-center mr-3 ml-3  items-center rounded-lg text-gray-700 dark:text-white"
              >
                <Bars3Icon aria-hidden="true" className="h-10 w-10" />
              </button>
              <Link className="h-full flex self-center" href="/">
                <img
                  alt="logo"
                  src="https://storage.googleapis.com/khs-zlin/logo_small.svg"
                  className="flex h-[50px]  self-center object-contain lg:hidden"
                />
              </Link>
            </div>
          </div>
          <Link className="h-full flex  ml-3 " href="/">
            <img
              alt="logo"
              src="https://storage.googleapis.com/khs-zlin/logo.svg"
              className="hidden h-[70px] self-center object-contain lg:flex"
            />
          </Link>
          <BigScreenMenu path={pathName} />
          <div className="flex flex-row gap-x-3 flex-nowrap h-full self-end items-end">
            <ThemeToggle />
            <DashboardMenu />
          </div>
        </nav>
        <MobileMenu
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          path={pathName}
        />
      </header>
    </>
  );
};
