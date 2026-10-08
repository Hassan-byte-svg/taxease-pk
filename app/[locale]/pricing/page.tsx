import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { copy, govNote, packages, say } from "@/lib/catalog";
import { formatPkr } from "@/lib/money";

export default async function PricingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <main id="content" className="mx-auto w-full max-w-[75rem] px-4 py-16 sm:px-6">
      <h1 className="max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">{say(copy.priceTitle, locale)}</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">{say(copy.priceLead, locale)}</p>
      <ul className="mt-10 grid gap-4 md:grid-cols-2">
        {packages.map((item, index) => (
          <li key={item.name.en} className={index === 2 ? "rounded-2xl border border-primary bg-card p-6 shadow-card" : "rounded-2xl border border-border bg-card p-6 shadow-card"}>
            <h2 className="text-xl font-semibold">{say(item.name, locale)}</h2>
            <p className="mt-3 text-2xl font-semibold">{item.price == null ? say(copy.quoted, locale) : formatPkr(item.price, locale)}</p>
            <p className="mt-3 text-sm text-muted-foreground">{say(item.text, locale)}</p>
            <p className="mt-3 text-sm text-muted-foreground">{say(govNote, locale)}</p>
            <Link href="/contact" className={buttonVariants({ variant: index === 2 ? "primary" : "outline" }) + " mt-6"}>
              {item.price == null ? say(copy.quoted, locale) : say(copy.choose, locale)}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
