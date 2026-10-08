"use client";

import { Headset, Lock, Receipt, ShieldCheck, Timer, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/sections/reveal";

const cards = [
  { id: "fbrCard", icon: ShieldCheck, className: "lg:col-span-2 lg:row-span-2" },
  { id: "experts", icon: Users, className: "lg:col-span-2" },
  { id: "secure", icon: Lock, className: "" },
  { id: "support", icon: Headset, className: "" },
  { id: "fast", icon: Timer, className: "" },
  { id: "refundsCard", icon: Receipt, className: "lg:col-span-2" },
] as const;

export function FeatureBento() {
  const t = useTranslations("Home");

  return (
    <section id="services" className="scroll-mt-24 bg-muted/60 py-24">
      <div className="mx-auto max-w-[75rem] px-4 sm:px-6">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{t("whyTitle")}</h2>
          <p className="mt-3 max-w-2xl text-lg text-muted-foreground">{t("whySub")}</p>
        </Reveal>
        <div className="mt-12 grid gap-4 lg:grid-cols-4">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <article
                key={card.id}
                className={`rounded-2xl border border-border bg-card p-6 shadow-card transition hover:-translate-y-1 ${card.className}`}
              >
                <Icon aria-hidden="true" className="text-primary" size={22} />
                <h3 className="mt-4 text-xl font-semibold">{t(`${card.id}Title`)}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{t(`${card.id}Body`)}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
