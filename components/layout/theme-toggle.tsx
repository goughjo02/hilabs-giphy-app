"use client";

import * as React from "react";
import { Button } from "@/components/ui/button"; // Adjust the import path as needed
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { setTheme, resolvedTheme: theme } = useTheme();

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme}>
      <Sun
        className={` transition-all  animate-rotateIn dark:animate-rotateOut`}
      />
      <Moon
        className={`absolute transition-all animate-rotateOut dark:animate-rotateIn`}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
