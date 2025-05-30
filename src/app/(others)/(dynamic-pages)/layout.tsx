import React from "react";
import { Breadcrumbs } from "@/src/components/ui/breadcrumbs";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" flex w-full bg-white dark:bg-zinc-900 mt-28 max-w-screen-xl flex-col items-start justify-start rounded text-center sm:px-3 md:px-8 lg:px-0">
      <Breadcrumbs />
      {children}
      <div className="w-full flex">
        <img
          className="w-full mt-32 dark:brightness-[.25]"
          src="https://storage.googleapis.com/khs-zlin/others/moutain-vector.svg"
          alt="grafika hory"
        />
      </div>
    </div>
  );
}
