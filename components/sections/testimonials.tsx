"use client";

import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

const ids = ["a", "b", "c"] as const;

export function Testimonials() {
  const t = useTranslations("Home");
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const id = ids[index];

  function move(step: number) {
    setExpanded(false);
    setIndex((current) => (current + step + ids.length) % ids.length);
  }

  return (
    <section className="bg-muted/60 py-24" aria-roledescription="carousel" aria-label={t("reviewsTitle")}>
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">{t("sample")}</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight">{t("reviewsTitle")}</h2>
        <article className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-card">
          <div className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
              {t(`${id}Initial`)}
            </span>
            <div>
              <p className="font-semibold">{t(`${id}Name`)}</p>
              <p className="flex text-accent" aria-label={t("stars")}>
                {Array.from({ length: 5 }, (_, star) => (
                  <Star key={star} size={16} fill="currentColor" aria-hidden="true" />
                ))}
              </p>
            </div>
          </div>
          <p className={expanded ? "mt-4 leading-relaxed" : "mt-4 line-clamp-3 leading-relaxed"}>{t(`${id}Quote`)}</p>
          <button type="button" className="mt-3 min-h-11 text-sm font-semibold text-primary" onClick={() => setExpanded((value) => !value)}>
            {expanded ? t("showLess") : t("readMore")}
          </button>
        </article>
        <div className="mt-4 flex gap-2">
          <button type="button" className="grid size-11 place-items-center rounded-xl border border-border bg-card" aria-label={t("prev")} onClick={() => move(-1)}>
            <ChevronLeft aria-hidden="true" size={18} />
          </button>
          <button type="button" className="grid size-11 place-items-center rounded-xl border border-border bg-card" aria-label={t("next")} onClick={() => move(1)}>
            <ChevronRight aria-hidden="true" size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
