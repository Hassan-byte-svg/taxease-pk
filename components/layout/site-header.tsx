"use client";

import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { LocaleToggle } from "@/components/layout/locale-toggle";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { brand } from "@/lib/brand";
import { mainNav } from "@/lib/nav";
import { cn } from "@/lib/utils";

function subscribeScroll(onStoreChange: () => void) {
  window.addEventListener("scroll", onStoreChange, { passive: true });
  return () => window.removeEventListener("scroll", onStoreChange);
}

export function SiteHeader() {
  const t = useTranslations("Nav");
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const scrolled = useSyncExternalStore(
    subscribeScroll,
    () => window.scrollY > 8,
    () => false,
  );

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b backdrop-blur-md transition-shadow",
        scrolled
          ? "border-border bg-background/80 shadow-card"
          : "border-transparent bg-background/70",
      )}
    >
      <div className="mx-auto flex h-16 max-w-[75rem] items-center gap-2 px-4 sm:gap-3 sm:px-6">
        <Link href="/" className="flex min-w-0 items-center gap-2" aria-label={t("home")}>
          <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary text-sm font-semibold text-primary-foreground">
            T
          </span>
          <span className="hidden truncate font-semibold tracking-tight min-[400px]:inline">
            {brand.name}
          </span>
        </Link>

        <nav className="ms-4 hidden items-center gap-1 lg:flex" aria-label={t("primary")}>
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
            className={cn(buttonVariants({ variant: "primary" }), "hidden md:inline-flex")}
          >
            {t("fileReturn")}
          </Link>
          <button
            type="button"
            className={cn(buttonVariants({ variant: "outline" }), "px-3 lg:hidden")}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen(true)}
          >
            <Menu aria-hidden="true" size={18} />
            <span className="sr-only">{t("openMenu")}</span>
          </button>
        </div>
      </div>

      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-slate-950/40"
            aria-label={t("closeMenu")}
            onClick={() => setOpen(false)}
          />
          <div
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label={t("mobile")}
            className="drawer-panel absolute inset-y-0 end-0 flex w-full max-w-sm flex-col border-s border-border bg-card shadow-card"
          >
            <div className="flex h-16 items-center justify-between px-4">
              <p className="font-semibold">{brand.name}</p>
              <button
                ref={closeRef}
                type="button"
                className={cn(buttonVariants({ variant: "outline" }), "px-3")}
                onClick={() => setOpen(false)}
              >
                <X aria-hidden="true" size={18} />
                <span className="sr-only">{t("closeMenu")}</span>
              </button>
            </div>
            <nav className="flex flex-1 flex-col gap-2 overflow-y-auto px-4 pb-8" aria-label={t("mobile")}>
              <Link
                href="/file"
                className={buttonVariants({ variant: "primary" })}
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
                  className="flex min-h-11 items-center rounded-xl px-3 text-base font-medium hover:bg-muted"
                  onClick={() => setOpen(false)}
                >
                  {t(item.id)}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      ) : null}
    </header>
  );
}
