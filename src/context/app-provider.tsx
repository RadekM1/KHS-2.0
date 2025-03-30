"use client";
import React from "react";
import { ThemeProvider } from "./theme-provider";
import { SessionProvider } from "next-auth/react";
import { SessionContextProvider } from "./session-provider";


export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <SessionProvider>
        <SessionContextProvider>{children}</SessionContextProvider>
      </SessionProvider>
    </ThemeProvider>
  );
};
