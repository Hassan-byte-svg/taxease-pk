"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

export default function LocaleError({ reset }: { error: Error; reset: () => void }) {
  const t = useTranslations("Status");

  return (
    <main id="content" className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">{t("errorTitle")}</h1>
      <p className="mt-4 text-muted-foreground">{t("errorBody")}</p>
      <Button className="mt-8" onClick={reset}>
        {t("retry")}
      </Button>
    </main>
  );
}
