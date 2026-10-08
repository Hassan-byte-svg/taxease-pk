"use client";

import { MessageCircle, ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Reveal } from "@/components/sections/reveal";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { brand, whatsappHref } from "@/lib/brand";
import { sampleStats } from "@/lib/demo";
import { cn } from "@/lib/utils";

function CountStat({ id, value }: { id: string; value: number }) {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      const frame = requestAnimationFrame(() => setShown(value));
      return () => cancelAnimationFrame(frame);
    }
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / 900);
      setShown(value * progress);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value]);

  if (id === "downloads") return <>{Math.max(1, Math.round(shown / 1_000_000))}M+</>;
  if (id === "rating") return <>{shown.toFixed(1)}★</>;
  return <>{Math.round(shown / 1_000)}k+</>;
}

export function HomeHero() {
  const t = useTranslations("Home");

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(15,118,110,0.16),transparent_55%),radial-gradient(ellipse_at_top_right,rgba(245,158,11,0.12),transparent_40%)]" />
      <div className="relative mx-auto grid max-w-[75rem] items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
        <Reveal>
          <p className="text-sm font-semibold text-primary">{t("eyebrow")}</p>
          <h1 className="mt-4 max-w-xl text-4xl font-semibold tracking-tight text-balance sm:text-6xl sm:leading-[1.05]">
            {t("title")}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">{t("sub")}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/contact" className={buttonVariants({ variant: "primary" })}>
              {t("start")}
            </Link>
            <a
              href={whatsappHref(brand.whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "outline" })}
            >
              <MessageCircle aria-hidden="true" size={18} />
              {t("whatsapp")}
            </a>
          </div>
          <ul className="mt-8 flex flex-wrap gap-2">
            {(["fbr", "encrypted", "raast"] as const).map((chip) => (
              <li
                key={chip}
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-card px-3 text-sm font-medium"
              >
                <ShieldCheck aria-hidden="true" size={16} className="text-primary" />
                {t(chip)}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal>
          <div className="relative mx-auto w-full max-w-md rotate-0 lg:-rotate-2">
            <div
              className="rounded-2xl border border-border bg-card p-5 shadow-card"
              aria-hidden="true"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">{t("previewTitle")}</p>
                <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-semibold text-primary">
                  {t("previewLive")}
                </span>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-3">
                {[70, 45, 88].map((height) => (
                  <div key={height} className="rounded-xl bg-muted p-3">
                    <div className="h-16 overflow-hidden rounded-lg bg-background">
                      <div className="mt-auto h-full bg-primary/80" style={{ height: `${height}%`, marginTop: `${100 - height}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between rounded-xl bg-muted px-3 py-3 text-sm">
                <span>{t("previewTax")}</span>
                <span className="font-semibold">Rs. 6,000</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
      <div className="relative mx-auto max-w-[75rem] px-4 pb-8 sm:px-6">
        <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">{t("sample")}</p>
        <dl className="mt-3 grid gap-4 sm:grid-cols-3">
          {sampleStats.map((stat) => (
            <div key={stat.id} className="rounded-2xl border border-border bg-card px-4 py-5">
              <dt className="text-sm text-muted-foreground">{t(stat.id)}</dt>
              <dd className={cn("mt-1 text-3xl font-semibold tracking-tight")}>
                <CountStat id={stat.id} value={stat.value} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
