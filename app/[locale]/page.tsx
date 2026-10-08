import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

const swatches = [
  { key: "primary", className: "bg-primary" },
  { key: "accent", className: "bg-accent" },
  { key: "success", className: "bg-success" },
  { key: "warning", className: "bg-warning" },
  { key: "danger", className: "bg-danger" },
] as const;

const sections = ["tools", "services", "pricing", "resources"] as const;

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("Shell");

  return (
    <main id="content">
      <section className="mx-auto max-w-[75rem] px-4 py-16 sm:px-6 sm:py-24">
        <p className="text-sm font-semibold text-primary">{t("eyebrow")}</p>
        <h1 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{t("body")}</p>
        <div className="mt-10 rounded-2xl border border-border bg-card p-6 shadow-card">
          <h2 className="text-sm font-semibold">{t("palette")}</h2>
          <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-5">
            {swatches.map((swatch) => (
              <li key={swatch.key}>
                <span className={`block h-12 rounded-xl ${swatch.className}`} />
                <span className="mt-2 block text-sm">{t(swatch.key)}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <div className="mx-auto grid max-w-[75rem] gap-4 px-4 pb-20 sm:px-6 md:grid-cols-2">
        {sections.map((id) => (
          <section
            key={id}
            id={id}
            className="scroll-mt-24 rounded-2xl border border-border bg-card p-6 shadow-card"
          >
            <h2 className="text-xl font-semibold">{t(`${id}Title`)}</h2>
            <p className="mt-3 text-muted-foreground">{t(`${id}Body`)}</p>
          </section>
        ))}
      </div>
    </main>
  );
}
