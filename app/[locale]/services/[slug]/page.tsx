import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { categories, copy, documentName, govNote, say, serviceBySlug, services, steps } from "@/lib/catalog";
import { formatPkr } from "@/lib/money";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => services.map((service) => ({ locale, slug: service.slug })));
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const service = serviceBySlug(slug);
  if (!service) notFound();
  const category = categories.find((item) => item.id === service.cat);
  const fee = service.fee == null ? say(copy.quoted, locale) : `${say(copy.from, locale)} ${formatPkr(service.fee, locale)}`;

  return (
    <main id="content" className="mx-auto w-full max-w-[75rem] px-4 py-16 sm:px-6">
      <Link href="/services" className="text-sm font-semibold text-primary">
        {say(copy.backServices, locale)}
      </Link>
      <p className="mt-6 text-sm font-semibold text-primary">{category ? say(category.name, locale) : ""}</p>
      <h1 className="mt-2 max-w-3xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">{say(service.name, locale)}</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">{say(service.summary, locale)}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link href={`/contact?service=${service.slug}`} className={buttonVariants({ variant: "primary" })}>
          {say(copy.speak, locale)}
        </Link>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <article className="rounded-2xl border border-border bg-card p-5 shadow-card">
          <p className="text-sm text-muted-foreground">{say(copy.timeline, locale)}</p>
          <p className="mt-2 text-xl font-semibold">{say(service.timeline, locale)}</p>
        </article>
        <article className="rounded-2xl border border-border bg-card p-5 shadow-card">
          <p className="text-sm text-muted-foreground">{say(copy.fee, locale)}</p>
          <p className="mt-2 text-xl font-semibold">{fee}</p>
        </article>
      </div>
      <p className="mt-4 max-w-2xl text-sm text-muted-foreground">{say(govNote, locale)}</p>
      <h2 className="mt-10 text-xl font-semibold">{say(copy.covers, locale)}</h2>
      <p className="mt-2 max-w-2xl text-muted-foreground">{say(service.summary, locale)}</p>
      <h2 className="mt-8 text-xl font-semibold">{say(copy.who, locale)}</h2>
      <p className="mt-2 max-w-2xl text-muted-foreground">{locale === "en" ? service.fit : say(service.summary, locale)}</p>
      <h2 className="mt-8 text-xl font-semibold">{say(copy.documents, locale)}</h2>
      <ul className="mt-3 max-w-xl list-disc space-y-2 ps-5">
        {service.docs.map((key) => (
          <li key={key}>{documentName(key, locale)}</li>
        ))}
      </ul>
      <h2 className="mt-8 text-xl font-semibold">{say(copy.next, locale)}</h2>
      <ol className="mt-4 grid gap-4 md:grid-cols-2">
        {steps.map((step, index) => (
          <li key={step.title.en} className="rounded-2xl border border-border bg-card p-5 shadow-card">
            <p className="text-sm font-semibold text-primary">{index + 1}</p>
            <p className="mt-2 font-semibold">{say(step.title, locale)}</p>
            <p className="mt-1 text-sm text-muted-foreground">{say(step.body, locale)}</p>
          </li>
        ))}
      </ol>
    </main>
  );
}
