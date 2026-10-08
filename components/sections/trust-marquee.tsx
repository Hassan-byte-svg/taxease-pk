"use client";

import { useTranslations } from "next-intl";
import { partnerMarks } from "@/lib/demo";

export function TrustMarquee() {
  const t = useTranslations("Home");
  const marks = [...partnerMarks, ...partnerMarks];

  return (
    <section className="border-y border-border bg-card py-8" aria-label={t("partners")}>
      <p className="mb-4 text-center text-xs font-semibold tracking-wide text-muted-foreground uppercase">
        {t("partners")}
      </p>
      <div className="marquee overflow-hidden">
        <ul className="marquee-track flex w-max gap-4 px-4">
          {marks.map((name, index) => (
            <li
              key={`${name}-${index}`}
              className="grid h-14 min-w-36 place-items-center rounded-xl border border-border bg-background px-4 text-sm font-semibold text-muted-foreground grayscale transition hover:grayscale-0 hover:text-foreground"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
