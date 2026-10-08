"use client";

import { Check } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { samplePlans } from "@/lib/demo";
import { formatPkr } from "@/lib/money";
import { cn } from "@/lib/utils";

const rows = ["return", "ntn", "review", "consultant", "whatsapp"] as const;

export function PricingSection() {
  const t = useTranslations("Home");
  const locale = useLocale();
  const [monthly, setMonthly] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <section id="pricing" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-[75rem] px-4 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">{t("sample")}</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{t("pricingTitle")}</h2>
            <p className="mt-3 max-w-2xl text-lg text-muted-foreground">{t("pricingSub")}</p>
          </div>
          <div className="inline-flex rounded-xl border border-border bg-card p-1" role="group" aria-label={t("billing")}>
            <button
              type="button"
              className={cn("min-h-11 rounded-lg px-4 text-sm font-semibold", !monthly && "bg-primary text-primary-foreground")}
              aria-pressed={!monthly}
              onClick={() => setMonthly(false)}
            >
              {t("once")}
            </button>
            <button
              type="button"
              className={cn("min-h-11 rounded-lg px-4 text-sm font-semibold", monthly && "bg-primary text-primary-foreground")}
              aria-pressed={monthly}
              onClick={() => setMonthly(true)}
            >
              {t("monthly")}
            </button>
          </div>
        </div>
        <div className="mt-12 grid items-stretch gap-4 lg:grid-cols-3">
          {samplePlans.map((plan) => {
            const price = monthly ? plan.monthly : plan.once;
            const popular = "popular" in plan && plan.popular;
            return (
              <article
                key={plan.id}
                className={cn(
                  "flex h-full flex-col rounded-2xl border bg-card p-6 shadow-card",
                  popular && "border-primary shadow-[0_0_0_1px_#0F766E] lg:scale-105",
                )}
              >
                <div className="flex h-full flex-col">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">{t(`${plan.id}Name`)}</h3>
                    {popular ? <Badge variant="accent">{t("popular")}</Badge> : null}
                  </div>
                  <p className="mt-4 text-3xl font-semibold">{formatPkr(price, locale)}</p>
                  <p className="text-sm text-muted-foreground">{monthly ? t("perMonth") : t("oneTime")}</p>
                  <ul className="mt-6 space-y-3 text-sm">
                    {rows.map((row) => (
                      <li key={row} className="flex items-start gap-2">
                        <Check aria-hidden="true" className="mt-0.5 text-primary" size={16} />
                        <span>{t(`${plan.id}_${row}`)}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/file" className={cn(buttonVariants({ variant: popular ? "primary" : "outline" }), "mt-8")}>
                    {t("start")}
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
        <button
          type="button"
          className="mt-8 min-h-11 text-sm font-semibold text-primary"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {t("compare")}
        </button>
        {open ? (
          <div className="mt-4 overflow-x-auto rounded-2xl border border-border">
            <table className="w-full min-w-[36rem] text-start text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className="px-4 py-3 text-start font-semibold">{t("feature")}</th>
                  {samplePlans.map((plan) => (
                    <th key={plan.id} className="px-4 py-3 text-start font-semibold">
                      {t(`${plan.id}Name`)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row} className="border-t border-border">
                    <th className="px-4 py-3 text-start font-medium">{t(`row_${row}`)}</th>
                    {samplePlans.map((plan) => (
                      <td key={plan.id} className="px-4 py-3">
                        {t(`${plan.id}_${row}`)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    </section>
  );
}
