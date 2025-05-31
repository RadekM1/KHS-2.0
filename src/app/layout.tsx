import React from "react";
import { Roboto } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/src/context/app-provider";
import { Toaster } from "@/src/components/ui/sonner";
import { Menu } from "../components/menu/menu";
import { Footer } from "../components/footer";
import { Suspense } from "react";
import { FooterNoParams } from "../components/footer-no-params";
import { MenuNoParams } from "../components/menu/menu-no-params";
import Script from "next/script";

const roboto = Roboto({
  weight: "400",
  variable: "--font-roboto",
  subsets: ["latin"],
});

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
        <Script
          strategy="afterInteractive"
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-77X8WLQ2VB"
        ></Script>
        <Script strategy="afterInteractive" id="google-analytics">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-77X8WLQ2VB');
            `}
        </Script>
        <AppProviders>
          <Suspense fallback={<MenuNoParams />}>
            <Menu />
          </Suspense>
          <main className="mx-auto flex w-full max-w-screen-xl flex-grow flex-col items-center justify-center">
            {children}
            <Toaster richColors expand={true} />
          </main>
          <Suspense fallback={<FooterNoParams />}>
            <Footer />
          </Suspense>
        </AppProviders>
      </body>
    </html>
  );
}
