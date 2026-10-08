"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

export function LocaleToggle() {
  const t = useTranslations("Locale");
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div
      className="inline-flex h-11 items-center gap-1 rounded-xl border border-border bg-card px-2 text-sm font-semibold"
      role="group"
      aria-label={t("label")}
    >
      <Link
        href={pathname}
        locale="en"
        hrefLang="en"
        lang="en"
        aria-current={locale === "en" ? "true" : undefined}
        className={`inline-flex h-full items-center px-1 ${locale === "en" ? "text-primary" : "text-muted-foreground"}`}
        aria-label={t("switchToEn")}
      >
        {t("en")}
      </Link>
      <span aria-hidden="true" className="text-border">
        |
      </span>
      <Link
        href={pathname}
        locale="ur"
        hrefLang="ur"
        lang="ur"
        aria-current={locale === "ur" ? "true" : undefined}
        className={`inline-flex h-full items-center px-1 ${locale === "ur" ? "text-primary" : "text-muted-foreground"}`}
        aria-label={t("switchToUr")}
      >
        {t("ur")}
      </Link>
    </div>
  );
}
