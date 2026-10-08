import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { TAX_DISCLAIMER, brand } from "@/lib/brand";

export async function SiteFooter() {
  const t = await getTranslations("Footer");
  const locale = await getLocale();

  return (
    <footer className="mt-auto border-t border-border bg-card">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <p className="font-semibold">{brand.name}</p>
          <p className="mt-3 text-sm text-muted-foreground">{t("tagline")}</p>
        </div>
        <div>
          <h2 className="text-sm font-semibold">{t("support")}</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a dir="ltr" href={`tel:${brand.supportPhone.replace(/\s/g, "")}`}>
                {brand.supportPhone}
              </a>
            </li>
            <li>
              <a dir="ltr" href={`mailto:${brand.supportEmail}`}>
                {brand.supportEmail}
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold">{t("policies")}</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/privacy">{t("privacy")}</Link>
            </li>
            <li>
              <Link href="/terms">{t("terms")}</Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold">{t("social")}</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {brand.social.map((item) => (
              <li key={item.id}>{item.label}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-6xl space-y-3 px-4 py-6 text-sm text-muted-foreground sm:px-6">
          {locale === "ur" ? <p>{t("disclaimerUr")}</p> : null}
          <p lang="en">{TAX_DISCLAIMER}</p>
          <p>{t("rights", { year: brand.copyrightYear, brand: brand.name })}</p>
        </div>
      </div>
    </footer>
  );
}
