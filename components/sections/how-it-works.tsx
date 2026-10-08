"use client";

import { ClipboardCheck, FileCheck2, UserRound, Wallet } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Reveal } from "@/components/sections/reveal";

const steps = [
  { id: "account", icon: UserRound },
  { id: "income", icon: Wallet },
  { id: "review", icon: ClipboardCheck },
  { id: "filed", icon: FileCheck2 },
] as const;

export function HowItWorks() {
  const t = useTranslations("Home");
  const [active, setActive] = useState(0);

  useEffect(() => {
    const nodes = steps.map((step) => document.getElementById(`step-${step.id}`));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const index = nodes.findIndex((node) => node === visible.target);
        if (index >= 0) setActive(index);
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: [0.4, 0.6] },
    );
    nodes.forEach((node) => node && observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="mx-auto max-w-[75rem] px-4 py-24 sm:px-6" aria-labelledby="how-title">
      <Reveal>
        <h2 id="how-title" className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {t("howTitle")}
        </h2>
        <p className="mt-3 max-w-2xl text-lg text-muted-foreground">{t("howSub")}</p>
      </Reveal>
      <ol className="mt-12 grid gap-6 lg:grid-cols-4">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const on = index === active;
          return (
            <li
              key={step.id}
              id={`step-${step.id}`}
              className={`relative rounded-2xl border bg-card p-6 shadow-card ${on ? "border-primary" : "border-border"}`}
            >
              <span
                className={`grid size-11 place-items-center rounded-full text-sm font-semibold ${on ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}
              >
                {index + 1}
              </span>
              <Icon aria-hidden="true" className="mt-4 text-primary" size={22} />
              <h3 className="mt-3 text-lg font-semibold">{t(`${step.id}Title`)}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{t(`${step.id}Body`)}</p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
