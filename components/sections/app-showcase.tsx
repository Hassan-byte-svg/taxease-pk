"use client";

import { useTranslations } from "next-intl";
import { Reveal } from "@/components/sections/reveal";

const points = ["app1", "app2", "app3"] as const;

export function AppShowcase() {
  const t = useTranslations("Home");

  return (
    <section className="mx-auto grid max-w-[75rem] items-center gap-12 px-4 py-24 sm:px-6 lg:grid-cols-2">
      <Reveal>
        <div className="mx-auto w-56 rounded-[2rem] border-8 border-slate-900 bg-card p-4 shadow-card">
          <div className="mx-auto mb-4 h-1.5 w-16 rounded-full bg-slate-300" />
          <div className="space-y-3">
            <div className="h-16 rounded-xl bg-primary/15" />
            <div className="h-8 rounded-lg bg-muted" />
            <div className="h-8 rounded-lg bg-muted" />
            <div className="h-24 rounded-xl bg-accent/30" />
          </div>
        </div>
      </Reveal>
      <Reveal>
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{t("appTitle")}</h2>
        <ul className="mt-6 space-y-3 text-muted-foreground">
          {points.map((point) => (
            <li key={point}>{t(point)}</li>
          ))}
        </ul>
        <p className="mt-6 inline-flex min-h-11 items-center rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white">
          {t("play")}
        </p>
      </Reveal>
    </section>
  );
}
