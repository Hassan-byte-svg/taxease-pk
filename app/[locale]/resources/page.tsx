import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { copy, say } from "@/lib/catalog";

const links = [
  { href: "/calculators", label: copy.calcTitle },
  { href: "/assistant", label: copy.aiTitle },
  { href: "/about", label: copy.aboutTitle },
  { href: "/contact", label: copy.contactTitle },
  { href: "/#resources", label: copy.questions },
] as const;

export default async function ResourcesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <main id="content" className="mx-auto w-full max-w-[75rem] px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{say(copy.resourcesTitle, locale)}</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">{say(copy.resourcesLead, locale)}</p>
      <ul className="mt-8 grid max-w-2xl gap-3">
        {links.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="flex min-h-14 items-center rounded-2xl border border-border bg-card px-5 font-semibold shadow-card hover:border-primary">
              {say(item.label, locale)}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
