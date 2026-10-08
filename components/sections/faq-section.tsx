"use client";

import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";

const ids = ["file", "ntn", "fee", "estimate"] as const;

export function FaqSection() {
  const t = useTranslations("Home");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<string | null>("file");
  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return ids.filter((id) => {
      if (!needle) return true;
      return `${t(`${id}Q`)} ${t(`${id}A`)}`.toLowerCase().includes(needle);
    });
  }, [query, t]);

  return (
    <section id="resources" className="scroll-mt-24 mx-auto max-w-3xl px-4 py-24 sm:px-6">
      <h2 className="text-3xl font-semibold tracking-tight">{t("faqTitle")}</h2>
      <label className="mt-6 block text-sm font-semibold" htmlFor="faq-search">
        {t("faqSearch")}
      </label>
      <input
        id="faq-search"
        className="mt-2 h-11 w-full rounded-xl border border-border bg-card px-3"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <div className="mt-6 divide-y divide-border rounded-2xl border border-border bg-card">
        {visible.length === 0 ? <p className="p-4 text-sm text-muted-foreground">{t("faqEmpty")}</p> : null}
        {visible.map((id) => {
          const isOpen = open === id;
          return (
            <div key={id}>
              <button
                type="button"
                className="flex min-h-11 w-full items-center justify-between px-4 py-3 text-start font-semibold"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : id)}
              >
                {t(`${id}Q`)}
                <span aria-hidden="true">{isOpen ? "–" : "+"}</span>
              </button>
              {isOpen ? <p className="px-4 pb-4 text-sm leading-6 text-muted-foreground">{t(`${id}A`)}</p> : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
