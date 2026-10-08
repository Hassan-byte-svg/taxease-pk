import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { copy, say, services, values } from "@/lib/catalog";

const intents = ["return", "ntn", "company", "contracts", "trademark", "notice", "secp", "pseb", "overseas"] as const;

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <main id="content" className="mx-auto w-full max-w-[75rem] px-4 py-16 sm:px-6">
      <h1 className="max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">{say(copy.aboutTitle, locale)}</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">{say(copy.aboutLead, locale)}</p>
      <ul className="mt-10 grid gap-4 md:grid-cols-3">
        {values.map((item) => (
          <li key={item.title.en} className="rounded-2xl border border-border bg-card p-5 shadow-card">
            <h2 className="text-lg font-semibold">{say(item.title, locale)}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{say(item.body, locale)}</p>
          </li>
        ))}
      </ul>
      <h2 className="mt-12 text-2xl font-semibold">{say(copy.whoTitle, locale)}</h2>
      <ul className="mt-4 grid gap-3 md:grid-cols-2">
        {intents.map((slug) => {
          const service = services.find((item) => item.slug === slug);
          if (!service) return null;
          return (
            <li key={slug}>
              <Link href={`/services/${slug}`} className="block rounded-2xl border border-border bg-card p-5 shadow-card hover:border-primary">
                <span className="font-semibold">{say(service.name, locale)}</span>
                <span className="mt-1 block text-sm text-muted-foreground">{say(service.summary, locale)}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
