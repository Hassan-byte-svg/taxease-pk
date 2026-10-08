"use client";

import { useLocale, useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { TAX_DISCLAIMER } from "@/lib/brand";
import { formatPkr } from "@/lib/money";
import { SALARY_RULESET, salaryTax } from "@/lib/tax/slabs";

export function SalaryCalculator() {
  const t = useTranslations("Home");
  const locale = useLocale();
  const [monthly, setMonthly] = useState(150_000);
  const result = useMemo(() => salaryTax(monthly * 12), [monthly]);
  const taxShare = result.annual === 0 ? 0 : result.tax / result.annual;
  const turn = 2 * Math.PI * 42;
  const dash = `${turn * taxShare} ${turn}`;

  return (
    <section id="calculator" className="scroll-mt-24 bg-muted/60 py-24" aria-labelledby="calc-title">
      <div className="mx-auto grid max-w-[75rem] gap-8 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-card sm:p-8">
          <h2 id="calc-title" className="text-3xl font-semibold tracking-tight">
            {t("calcTitle")}
          </h2>
          <p className="mt-3 text-muted-foreground">{t("calcSub")}</p>
          <label className="mt-8 block text-sm font-semibold" htmlFor="salary">
            {t("salary")}
          </label>
          <input
            id="salary"
            className="mt-3 w-full accent-primary"
            type="range"
            min={20_000}
            max={800_000}
            step={5_000}
            value={monthly}
            aria-valuemin={20_000}
            aria-valuemax={800_000}
            aria-valuenow={monthly}
            aria-valuetext={formatPkr(monthly, locale)}
            onChange={(event) => setMonthly(Number(event.target.value))}
          />
          <input
            className="mt-3 h-11 w-full rounded-xl border border-border bg-background px-3"
            inputMode="numeric"
            aria-label={t("salary")}
            value={monthly}
            onChange={(event) => {
              const next = Number(event.target.value.replace(/\D/g, ""));
              if (Number.isFinite(next)) setMonthly(Math.min(2_000_000, next));
            }}
          />
          <p className="mt-2 text-sm text-muted-foreground">{SALARY_RULESET}</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 shadow-card sm:p-8" aria-live="polite">
          <div className="flex items-center gap-6">
            <svg viewBox="0 0 120 120" className="size-28 shrink-0" role="img" aria-label={t("calcChart")}>
              <circle cx="60" cy="60" r="42" fill="none" stroke="currentColor" className="text-muted" strokeWidth="14" />
              <circle
                key={result.tax}
                cx="60"
                cy="60"
                r="42"
                fill="none"
                stroke="currentColor"
                className="text-primary"
                strokeWidth="14"
                strokeDasharray={dash}
                strokeLinecap="round"
                transform="rotate(-90 60 60)"
              />
            </svg>
            <div>
              <p className="text-sm text-muted-foreground">{t("annualTax")}</p>
              <p className="text-3xl font-semibold">{formatPkr(result.tax, locale)}</p>
            </div>
          </div>
          <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-muted-foreground">{t("monthlyTax")}</dt>
              <dd className="mt-1 text-lg font-semibold">{formatPkr(result.monthlyTax, locale)}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">{t("takeHome")}</dt>
              <dd className="mt-1 text-lg font-semibold">{formatPkr(result.takeHome, locale)}</dd>
            </div>
          </dl>
          <p className="mt-6 text-sm text-muted-foreground">{TAX_DISCLAIMER}</p>
        </div>
      </div>
    </section>
  );
}
