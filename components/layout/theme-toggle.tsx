"use client";

import { Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const t = useTranslations("Theme");
  const { setTheme } = useTheme();

  return (
    <button
      type="button"
      className={cn(buttonVariants({ variant: "outline" }), "px-3")}
      aria-label={t("toggle")}
      onClick={() => {
        const isDark = document.documentElement.classList.contains("dark");
        setTheme(isDark ? "light" : "dark");
      }}
    >
      <Sun className="hidden dark:block" aria-hidden="true" size={18} />
      <Moon className="dark:hidden" aria-hidden="true" size={18} />
    </button>
  );
}
