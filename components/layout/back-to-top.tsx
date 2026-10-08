"use client";

import { ArrowUp } from "lucide-react";
import { useTranslations } from "next-intl";
import { useSyncExternalStore } from "react";

function subscribe(onStoreChange: () => void) {
  window.addEventListener("scroll", onStoreChange, { passive: true });
  return () => window.removeEventListener("scroll", onStoreChange);
}

export function BackToTop() {
  const t = useTranslations("Chrome");
  const visible = useSyncExternalStore(subscribe, () => window.scrollY > 480, () => false);

  if (!visible) return null;

  return (
    <button
      type="button"
      className="fixed right-4 bottom-20 z-30 grid size-11 place-items-center rounded-full border border-border bg-card text-foreground shadow-card"
      aria-label={t("backToTop")}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <ArrowUp aria-hidden="true" size={18} />
    </button>
  );
}
