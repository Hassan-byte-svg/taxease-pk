"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { aiFlows, copy, say, serviceBySlug } from "@/lib/catalog";
import { cn } from "@/lib/utils";

export function AssistantPanel() {
  const locale = useLocale();
  const [slug, setSlug] = useState<string | null>(null);
  const flow = aiFlows.find((item) => item.slug === slug);
  const service = slug ? serviceBySlug(slug) : undefined;

  return (
    <div>
      <p className="text-sm font-semibold">{say(copy.aiPrompt, locale)}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {aiFlows.map((item) => {
          const name = serviceBySlug(item.slug);
          return (
            <button
              key={item.slug}
              type="button"
              className={slug === item.slug ? "min-h-11 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground" : "min-h-11 rounded-xl border border-border bg-card px-4 text-sm font-semibold"}
              onClick={() => setSlug(item.slug)}
            >
              {name ? say(name.name, locale) : item.slug}
            </button>
          );
        })}
      </div>
      {flow && service ? (
        <article className="mt-6 max-w-2xl rounded-2xl border border-border bg-card p-6 shadow-card">
          <p className="text-sm font-semibold text-primary">{say(copy.aiReco, locale)}</p>
          <h2 className="mt-2 text-2xl font-semibold">{say(service.name, locale)}</h2>
          <p className="mt-3">{say(flow.a, locale)}</p>
          <p className="mt-2 text-sm text-muted-foreground">{say(flow.q, locale)}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href={`/services/${service.slug}`} className={buttonVariants({ variant: "primary" })}>
              {say(copy.open, locale)}
            </Link>
            <Link href={`/contact?service=${service.slug}`} className={buttonVariants({ variant: "outline" })}>
              {say(copy.speak, locale)}
            </Link>
            <button type="button" className={cn(buttonVariants({ variant: "ghost" }))} onClick={() => setSlug(null)}>
              {say(copy.startOver, locale)}
            </button>
          </div>
        </article>
      ) : null}
    </div>
  );
}
