"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { FILING_DEADLINE } from "@/lib/demo";

export function DeadlineBanner() {
  const t = useTranslations("Home");
  const [days, setDays] = useState<number | null>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const ms = new Date(FILING_DEADLINE).getTime() - Date.now();
      setDays(Math.max(0, Math.ceil(ms / 86_400_000)));
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section className="bg-gradient-to-r from-primary to-teal-600 text-primary-foreground">
      <div className="mx-auto flex max-w-[75rem] flex-col items-start justify-between gap-6 px-4 py-16 sm:px-6 lg:flex-row lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide">{t("deadlineKicker")}</p>
          <p className="mt-2 text-4xl font-semibold">
            {days === null ? "—" : t("daysLeft", { days })}
          </p>
          <p className="mt-2 max-w-xl text-sm text-primary-foreground/80">{t("deadlineNote")}</p>
        </div>
        <Link href="/file" className={buttonVariants({ variant: "accent" })}>
          {t("start")}
        </Link>
      </div>
    </section>
  );
}
