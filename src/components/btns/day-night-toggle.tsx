"use client";

import { useTheme } from "next-themes";
import { IoSunnySharp } from "react-icons/io5";
import { useState, useEffect } from "react";
import { MdDarkMode } from "react-icons/md";
import React from "react";

export const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [themeIcon, setThemeIcon] = useState<"light" | "dark" | null>(null);

  useEffect(() => {
    if (resolvedTheme) {
      if (resolvedTheme === "light" || resolvedTheme === "dark") {
        setThemeIcon(resolvedTheme);
      }
    }
  }, [resolvedTheme]);

  return (
    <button
      aria-label="light or dark theme button"
      className="h-full flex"
      onClick={() => {
        const newTheme = resolvedTheme === "light" ? "dark" : "light";
        setTheme(newTheme);
        setThemeIcon(newTheme);
      }}
    >
      {themeIcon === "light" && (
        <MdDarkMode className="h-6 w-6 self-center flex ease-in-out duration-300 transition-all text-gray-600 hover:text-gray-800" />
      )}
      {themeIcon === "dark" && (
        <IoSunnySharp className="h-6 w-6 self-center flex ease-in-out duration-300 transition-all text-gray-200 hover:text-white " />
      )}
    </button>
  );
};
