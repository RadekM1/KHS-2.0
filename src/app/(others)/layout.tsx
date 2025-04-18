import React from "react";
import { Breadcrumbs } from "@/src/components/ui/breadcrumbs";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" flex w-full mb-6 pb-10 bg-white dark:bg-zinc-900 mt-28 max-w-screen-xl flex-col items-start justify-start rounded p-2 text-center sm:px-3 md:px-8 lg:px-0">
      <Breadcrumbs />
      {children}
    </div>
  );
}
