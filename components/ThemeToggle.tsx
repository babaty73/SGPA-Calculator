"use client";

import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  function toggle() {
    const isDark = document.documentElement.classList.toggle("dark");
    try {
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch {
      // storage unavailable: the choice just won't be remembered
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Switch between light and dark mode"
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-line text-ink hover:bg-brand-50"
    >
      <Moon size={18} aria-hidden="true" className="theme-icon-moon" />
      <Sun size={18} aria-hidden="true" className="theme-icon-sun" />
    </button>
  );
}
