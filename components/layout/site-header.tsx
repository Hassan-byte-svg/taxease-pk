"use client";

import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { LocaleToggle } from "@/components/layout/locale-toggle";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { brand } from "@/lib/brand";
import { mainNav } from "@/lib/nav";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const t = useTranslations("Nav");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:px-6">
        <Link href="/" className="flex min-w-0 items-center gap-2" aria-label={t("home")}>
          <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary text-sm font-semibold text-primary-foreground">
            T
          </span>
          <span className="truncate font-semibold tracking-tight">{brand.name}</span>
        </Link>

        <nav className="ms-6 hidden items-center gap-1 lg:flex" aria-label={t("primary")}>
          {mainNav.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              {t(item.id)}
            </Link>
          ))}
        </nav>

        <div className="ms-auto flex items-center gap-2">
          <LocaleToggle />
          <ThemeToggle />
          <Link
            href="/sign-in"
            className={cn(buttonVariants({ variant: "ghost" }), "hidden md:inline-flex")}
          >
            {t("signIn")}
          </Link>
          <Link
            href="/file"
            className={cn(buttonVariants({ variant: "accent" }), "hidden md:inline-flex")}
          >
            {t("fileReturn")}
          </Link>
          <button
            type="button"
            className={cn(buttonVariants({ variant: "outline" }), "px-3 lg:hidden")}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X aria-hidden="true" size={18} /> : <Menu aria-hidden="true" size={18} />}
            <span className="sr-only">{open ? t("closeMenu") : t("openMenu")}</span>
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          aria-label={t("mobile")}
          className="border-t border-border bg-background px-4 py-4 lg:hidden"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-2">
            <Link
              href="/file"
              className={buttonVariants({ variant: "accent" })}
              onClick={() => setOpen(false)}
            >
              {t("fileReturn")}
            </Link>
            <Link
              href="/sign-in"
              className={buttonVariants({ variant: "outline" })}
              onClick={() => setOpen(false)}
            >
              {t("signIn")}
            </Link>
            {mainNav.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="rounded-xl px-3 py-2 text-sm font-medium hover:bg-muted"
                onClick={() => setOpen(false)}
              >
                {t(item.id)}
              </Link>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
