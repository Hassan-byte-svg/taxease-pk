"use client";

import { useMemo, useState } from "react";
import { useLocale } from "next-intl";
import { TAX_DISCLAIMER } from "@/lib/brand";
import { copy, say } from "@/lib/catalog";
import { formatPkr } from "@/lib/money";
import {
  SALARY_RULESET,
  businessTax,
  capitalGain,
  salaryTax,
  salesTax,
  type GainKind,
} from "@/lib/tax/slabs";

type Kind = "salary" | "business" | "sales" | "gain";

function money(value: string) {
  const number = Number(value.replace(/,/g, ""));
  return Number.isFinite(number) && number > 0 ? number : 0;
}

export function CalcBoard() {
  const locale = useLocale();
  const [kind, setKind] = useState<Kind>("salary");
  const [mode, setMode] = useState<"month" | "year">("month");
  const [amount, setAmount] = useState("150000");
  const [inclusive, setInclusive] = useState(false);
  const [gainKind, setGainKind] = useState<GainKind>("property-filer");
  const value = money(amount);
  const annual = mode === "month" ? value * 12 : value;
  const salary = useMemo(() => salaryTax(annual), [annual]);
  const business = useMemo(() => businessTax(annual), [annual]);
  const sales = salesTax(value, inclusive);
  const gain = capitalGain(value, gainKind);
  const shown = kind === "salary" ? salary.tax : kind === "business" ? business.tax : kind === "sales" ? sales.tax : gain.tax;

  const kinds: { id: Kind; label: string }[] = [
    { id: "salary", label: say(copy.salary, locale) },
    { id: "business", label: say(copy.business, locale) },
    { id: "sales", label: say(copy.sales, locale) },
    { id: "gain", label: say(copy.gain, locale) },
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
        <div className="flex flex-wrap gap-2" role="tablist">
          {kinds.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={kind === item.id}
              className={kind === item.id ? "min-h-11 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground" : "min-h-11 rounded-xl border border-border px-4 text-sm font-semibold"}
              onClick={() => setKind(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
        {kind === "salary" || kind === "business" ? (
          <div className="mt-4 flex gap-2">
            <button type="button" className={mode === "month" ? "min-h-11 rounded-xl bg-muted px-4 text-sm font-semibold" : "min-h-11 rounded-xl border border-border px-4 text-sm font-semibold"} onClick={() => setMode("month")}>
              {say(copy.monthly, locale)}
            </button>
            <button type="button" className={mode === "year" ? "min-h-11 rounded-xl bg-muted px-4 text-sm font-semibold" : "min-h-11 rounded-xl border border-border px-4 text-sm font-semibold"} onClick={() => setMode("year")}>
              {say(copy.annual, locale)}
            </button>
          </div>
        ) : null}
        {kind === "sales" ? (
          <label className="mt-4 flex min-h-11 items-center gap-2 text-sm">
            <input type="checkbox" checked={inclusive} onChange={(event) => setInclusive(event.target.checked)} />
            {say(copy.inclusive, locale)}
          </label>
        ) : null}
        {kind === "gain" ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {(
              [
                ["property-filer", copy.property],
                ["debt-filer", copy.debtFiler],
                ["debt-nonfiler", copy.debtNon],
              ] as const
            ).map(([id, label]) => (
              <button key={id} type="button" className={gainKind === id ? "min-h-11 rounded-xl bg-muted px-4 text-sm font-semibold" : "min-h-11 rounded-xl border border-border px-4 text-sm font-semibold"} onClick={() => setGainKind(id)}>
                {say(label, locale)}
              </button>
            ))}
          </div>
        ) : null}
        <label className="mt-6 block text-sm font-semibold" htmlFor="calc-amount">
          {say(copy.amount, locale)}
          <input
            id="calc-amount"
            inputMode="numeric"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            className="mt-2 w-full max-w-xs rounded-xl border border-border bg-background px-3 py-3 text-base font-normal"
          />
        </label>
        {kind === "salary" ? <p className="mt-4 text-sm text-muted-foreground">{SALARY_RULESET}</p> : null}
      </div>
      <article className="rounded-2xl border border-border bg-card p-6 shadow-card">
        <p className="text-sm text-muted-foreground">{say(copy.taxDue, locale)}</p>
        <p className="mt-2 text-3xl font-semibold tracking-tight">{formatPkr(shown, locale)}</p>
        {kind === "salary" ? (
          <p className="mt-3 text-sm text-muted-foreground">
            {say(copy.eachMonth, locale)} {formatPkr(salary.monthlyTax, locale)} · {say(copy.afterTax, locale)} {formatPkr(salary.takeHome, locale)}
          </p>
        ) : null}
        {kind === "business" ? (
          <p className="mt-3 text-sm text-muted-foreground">
            {say(copy.surcharge, locale)} {formatPkr(business.surcharge, locale)} · {(business.effective * 100).toFixed(2)}%
          </p>
        ) : null}
        {kind === "sales" ? (
          <p className="mt-3 text-sm text-muted-foreground">
            {say(copy.net, locale)} {formatPkr(sales.net, locale)} · {say(copy.gross, locale)} {formatPkr(sales.gross, locale)}
          </p>
        ) : null}
        {kind === "gain" ? <p className="mt-3 text-sm text-muted-foreground">{Math.round(gain.rate * 100)}%</p> : null}
        <p className="mt-6 text-sm text-muted-foreground">{TAX_DISCLAIMER}</p>
      </article>
    </div>
  );
}
