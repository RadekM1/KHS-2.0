import React from "react";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/src/context/app-provider";
import { Toaster } from "@/src/components/ui/sonner";
import { Menu } from "../components/menu/menu";
import { Footer } from "../components/footer";

const roboto = Roboto({
  weight: "400",
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Klub horských sportů Zlín",
  description:
    "Klub horských sportů Zlín, horolezecký oddíl Zlín. Web od lezců pro lezce. Přehled akci a výprav.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs" suppressHydrationWarning>
      <body
        className={`${roboto.variable} mx-auto font-roboto w-full flex flex-col justify-center bg-gray-100 dark:bg-zinc-950 antialiased`}
      >
        <AppProviders>
          <Menu />
          <main className="mx-auto flex w-full max-w-screen-xl flex-grow flex-col items-center justify-center">
            {children}
            <Toaster richColors expand={true} />
          </main>
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
