import React from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" flex w-full  bg-white dark:bg-zinc-950 mt-16 max-w-screen-xl flex-col items-start justify-start rounded p-2 text-center sm:px-3 md:px-8 lg:px-0">
      {children}
    </div>
  );
}
