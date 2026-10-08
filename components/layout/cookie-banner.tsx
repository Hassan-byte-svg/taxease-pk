"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "taxease-cookie";

export function CookieBanner() {
  const t = useTranslations("Chrome");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      // The first paint must match the server, which has no stored choice.
      // eslint-disable-next-line react-hooks/set-state-in-effect -- read cookie consent after mount
      setOpen(true);
    }
  }, []);

  function choose(value: "accepted" | "declined") {
    localStorage.setItem(STORAGE_KEY, value);
    setOpen(false);
  }

  if (!open) return null;

  return (
    <aside
      className="fixed bottom-4 left-4 z-30 w-[min(calc(100%-6.5rem),20rem)] rounded-2xl border border-border bg-card p-4 text-card-foreground shadow-card"
      aria-label={t("cookiesTitle")}
    >
      <p className="font-semibold">{t("cookiesTitle")}</p>
      <p className="mt-2 text-sm text-muted-foreground">{t("cookiesBody")}</p>
      <div className="mt-4 flex gap-2">
        <Button className="flex-1" onClick={() => choose("accepted")}>
          {t("accept")}
        </Button>
        <Button className="flex-1" variant="outline" onClick={() => choose("declined")}>
          {t("decline")}
        </Button>
      </div>
    </aside>
  );
}
