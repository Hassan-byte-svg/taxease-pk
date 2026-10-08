"use client";

import { useMemo, useState } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { categories, copy, say, services, type CategoryId } from "@/lib/catalog";
import { formatPkr } from "@/lib/money";

function feeLabel(fee: number | null, locale: string) {
  if (fee == null) return say(copy.quoted, locale);
  return `${say(copy.from, locale)} ${formatPkr(fee, locale)}`;
}

export function ServiceBrowser() {
  const locale = useLocale();
  const [query, setQuery] = useState("");
  const [lane, setLane] = useState<CategoryId>("tax");
  const q = query.trim().toLowerCase();
  const matches = useMemo(() => {
    if (!q) return services.filter((service) => service.cat === lane);
    return services.filter((service) => {
      const blob = `${service.name.en} ${service.name.ur} ${service.summary.en} ${service.summary.ur}`.toLowerCase();
      return blob.includes(q);
    });
  }, [lane, q]);

  return (
    <div>
      <label className="block max-w-sm text-sm font-semibold" htmlFor="service-search">
        {say(copy.search, locale)}
        <input
          id="service-search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="mt-2 w-full rounded-xl border border-border bg-card px-3 py-3 text-base font-normal"
        />
      </label>
      {q ? null : (
        <div className="mt-6 flex flex-wrap gap-2" role="tablist">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={lane === cat.id}
              className={
                lane === cat.id
                  ? "min-h-11 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground"
                  : "min-h-11 rounded-xl border border-border bg-card px-4 text-sm font-semibold"
              }
              onClick={() => setLane(cat.id)}
            >
              {say(cat.name, locale)}
            </button>
          ))}
        </div>
      )}
      {matches.length === 0 ? <p className="mt-8 text-muted-foreground">{say(copy.empty, locale)}</p> : null}
      <ul className="mt-6 grid gap-4 md:grid-cols-2">
        {matches.map((service) => (
          <li key={service.slug}>
            <Link
              href={`/services/${service.slug}`}
              className="flex h-full flex-col rounded-2xl border border-border bg-card p-5 shadow-card hover:border-primary"
            >
              <span className="text-sm font-semibold text-primary">{say(categories.find((item) => item.id === service.cat)!.name, locale)}</span>
              <span className="mt-2 text-lg font-semibold">{say(service.name, locale)}</span>
              <span className="mt-2 text-sm text-muted-foreground">{say(service.summary, locale)}</span>
              <span className="mt-4 text-sm font-semibold">{feeLabel(service.fee, locale)}</span>
              <span className="mt-3 text-sm font-semibold text-primary">{say(copy.open, locale)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
